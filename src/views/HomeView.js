import React, { useEffect, useRef, useState } from "react";
import { DataScreen, Graph, Map, PFD } from "../components/home";
import firebase from "../utils/firebase";
import { getDatabase, ref, onValue, off, get, onChildAdded, query, limitToLast } from "firebase/database"
import { userContainer } from "../container";
import { css } from "@emotion/react";
import { flattenLogdata }from'../utils/logData'

const HomeView = () => {
    const user = userContainer.useContainer().user;
    const [logDataGroup, setLogDataGroup] = useState(null);
    const [logData, setLogData] = useState([]);
    const refLogDataGroup = useRef(logDataGroup);
    const refLogData = useRef(logData);
    useEffect(() => {
        refLogDataGroup.current = logDataGroup;
    }, [logDataGroup])
    useEffect(() => {
        refLogData.current = logData;
    }, [logData])


    useEffect(() => {
        const initLogData = (data) => {
            if (!data) {
                setLogData([]);
                return;
            }
            const logArr = Object.keys(data).map((key) => (data[key]));
            logArr.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
            setLogData(logArr.map(e=>flattenLogdata(e)));
        };
        const updateLogData = (data) => {
            setLogData((prevLogData) => {
                const logData = prevLogData.concat(flattenLogdata(data))
                return logData;
            });
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
                <PFD log={logData} />
                <Graph log={logData} />
            </div>
            <div css={styles.inner}>
                <DataScreen log={logData} />
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