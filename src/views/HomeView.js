import React, { useEffect, useRef, useState } from "react";
import { DataScreen, Graph, Map, PFD } from "../components/home";
import firebase from "../utils/firebase";
import { getDatabase, ref, onValue, off, get, onChildAdded, query, limitToLast } from "firebase/database"
import { userContainer } from "../container";
import { css } from "@emotion/react";
import { flattenLogdata } from '../utils/logData'

const HomeView = () => {
    const user = userContainer.useContainer().user;
    const [logDataGroup, setLogDataGroup] = useState(null);
    const [logData, setLogData] = useState([]);
    const [latestLogData, setLatestLogData] = useState(null);
    const logStore = useRef([]);
    const refLogDataGroup = useRef(logDataGroup);
    useEffect(() => {
        refLogDataGroup.current = logDataGroup;
    }, [logDataGroup])


    useEffect(() => {
        const initLogData = (data) => {
            if (!data) {
                setLogData([]);
                return;
            }
            const logAll = Object.keys(data).map((key) => (data[key]));
            const logArr = logAll.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1)).filter((val, ind) => (ind % 10 === 0||ind>logAll.length-600));
            setLogData(logArr.map(e => flattenLogdata(e)));
        };
        const updateLogData = (data) => {
            const flattenedLogData = flattenLogdata(data)
            setLatestLogData(flattenedLogData);
            logStore.current = logStore.current.concat(flattenedLogData)
            if (logStore.current.length === 10) {
                setLogData((prevLogData) => {
                    const logData = prevLogData.concat(logStore.current)
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
                    initLogData(snapshot.val());
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