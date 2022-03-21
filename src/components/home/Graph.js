import { css } from '@emotion/react';
import React from 'react';
import Chart from 'react-apexcharts';


const Graph = ({ log }) => {
    const data = [
        {
            name: 'roll',
            data: log.map(data => {
                if (data['dataStationData/roll'].value === '---') return [data.timestamp.rawValue, null]
                return [data.timestamp.rawValue, data['dataStationData/roll'].value]
            })
        },
        {
            name: 'pitch',
            data: log.map(data => {
                if (data['dataStationData/pitch'].value === '---') return [data.timestamp.rawValue, null]
                return [data.timestamp.rawValue, data['dataStationData/pitch'].value]
            })
        },
        {
            name: 'yaw',
            data: log.map(data => {
                if (data['dataStationData/yaw'].value === '---') return [data.timestamp.rawValue, null]
                return [data['timestamp'].rawValue, data['dataStationData/yaw'].value]
            })
        },
    ]
    const options = {
        chart: {
            zoom: {
                enabled: true,
            },
            animations: {
                easing: 'linear',
                dynamicAnimation: {
                    speed: 500,
                },
            },
        },
        tooltip: {
            x: {
                format: 'yyyy/MM/dd HH:mm:ss',
            },
        },
        xaxis: {
            type: 'datetime',
            range: 60000,
        },
        yaxis: {
            labels: {
                formatter: val => val.toFixed(1)
            },
            title: { text: 'value' },
        },
        theme: {
            mode: 'dark',
        }
    };
    return (
        <div css={css`height:50%`} >
            <Chart type='line' options={options} series={data} height='100%' />
        </div>
    )
}

export default Graph
