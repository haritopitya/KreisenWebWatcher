import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useLogDataContainer = () => {
    const [logData, setLogData] = useState([]);
    const [lastData, setLastData] = useState({});
    const initLogData = (data) => {
        const logArr = Object.keys(data).map((key) => (data[key]));
        const sortedLog = logArr.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
        console.log(sortedLog.length)
        setLogData(sortedLog);
        setLastData(sortedLog[0]);
    }
    const updateLogData = (data) => {
        const prevLogData = logData;
        prevLogData.unshift(data);
        setLastData(data);
        setLogData(prevLogData);
    }
    return { logData, lastData, initLogData, updateLogData };
}

export default createContainer(useLogDataContainer);