import { css } from "@emotion/react";
import { get, getDatabase, limitToLast, off, onChildAdded, onValue, query, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { DataScreen, Graph, Map, PFD } from "../components/home";
import { userContainer } from "../container";
import firebase from "../utils/firebase";
import { flattenLogdata } from '../utils/logData';

const DETAIL_LANGE = 500;
const UPDATE_LATE = 10;

const HomeView = () => {
    const user = userContainer.useContainer().user;
    const [logDataGroup, setLogDataGroup] = useState(null);
    const [logData, setLogData] = useState([]);
    const [latestLogData, setLatestLogData] = useState(null);
    const logStore = useRef([]);
    const refLogDataGroup = useRef(logDataGroup);
    const latestLogDataKey = useRef(null);
    useEffect(() => {
        refLogDataGroup.current = logDataGroup;
    }, [logDataGroup])
    useEffect(() => {
        const initLogData = (snapshot) => {
            if (!snapshot.exists()) {
                setLogData([]);
                setLatestLogData(null)
                return;
            }
            let logAll = []
            snapshot.forEach((snapshot) => {
                logAll.push(snapshot.val())
                latestLogDataKey.current = snapshot.key;
            });
            const logArr = logAll.filter((val, ind) => ((logAll.length - (DETAIL_LANGE + 1)) < ind || ind % UPDATE_LATE === 0));
            setLogData(logArr.map(e => flattenLogdata(e)));
        };
        const updateLogData = (data) => {
            const flattenedLogData = flattenLogdata(data)
            setLatestLogData(flattenedLogData);
            logStore.current = logStore.current.concat(flattenedLogData)
            if (logStore.current.length === UPDATE_LATE) {
                setLogData((prevLogData) => {
                    let logData = prevLogData.concat(logStore.current)
                    if (logData.length >= (DETAIL_LANGE + UPDATE_LATE)) {
                        logData.splice(-(DETAIL_LANGE + UPDATE_LATE - 1), (UPDATE_LATE - 1))
                    }
                    return logData;
                });
                logStore.current = [];
            }
        };
        const db = getDatabase(firebase);
        const logDataGroupRef = ref(db, 'current-logdata-group');
        onValue(logDataGroupRef, (snapshot) => {
            const logDataGroup = snapshot.val();
            const prevLogDataGroup = refLogDataGroup.current;
            if (prevLogDataGroup) off(ref(db, `logdata/${prevLogDataGroup}`));
            if (logDataGroup) {
                const logDataRef = ref(db, `logdata/${logDataGroup}`)
                get(logDataRef).then(snapshot => {
                    initLogData(snapshot);
                }).catch(e => { console.error(e) });
                onChildAdded(query(logDataRef, limitToLast(1)), (snapshot, prevChildKey) => {
                    updateLogData(snapshot.val());
                })
            }
            setLogDataGroup(logDataGroup);
        })
        return (() => {
            off(logDataGroupRef)
            const logDataGroup = refLogDataGroup.current;
            if (logDataGroup) off(ref(db, `logdata/${logDataGroup}`))
        })
    }, [user])
    return (
        <div css={styles.wrap}>
            <div css={styles.inner}>
                <PFD latestData={latestLogData} />
                <Graph log={logData} />
            </div>
            <div css={styles.inner}>
                <DataScreen latestData={latestLogData} />
            </div>
            <div css={styles.inner}>
                <Map log={logData} />
            </div>
        </div>
    )
}

const styles = {
    wrap: css({
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
    }),
    inner: css({
        flex: 1,
    }),
}

export default HomeView