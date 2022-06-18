import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';


const Graph = React.memo(({ log }) => {
    const [range, setRange] = useState(300000);
    const [startTime, setStartTiem] = useState(log[log.length - 1] && log[log.length - 1].timestamp.rawValue + 9 * 60 * 60 * 1000);
    useEffect(() => {
        setStartTiem(log[log.length - 1] && log[log.length - 1].timestamp.rawValue + 9 * 60 * 60 * 1000)
        console.log('useEffect');
    }, [log])
    const data = [
        {
            name: '対気速',
            data: log.map(data => {
                if (data['speedometerData/airSpeed'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, null]
                return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, data['speedometerData/airSpeed'].value]
            })
        },
        {
            name: '高度',
            data: log.map(data => {
                if (data['altimeterData/altitude'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, null]
                return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, data['altimeterData/altitude'].value]
            })
        },
        {
            name: '出力左',
            data: log.map(data => {
                if (data['leftTachometerData/power'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, -1]
                return [data['timestamp'].rawValue + 9 * 60 * 60 * 1000, data['leftTachometerData/power'].value]
            })
        },
        {
            name: '出力右',
            data: log.map(data => {
                if (data['rightTachometerData/power'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, -1]
                return [data['timestamp'].rawValue + 9 * 60 * 60 * 1000, data['rightTachometerData/power'].value]
            })
        },
        {
            name: '回転数',
            data: log.map(data => {
                if (data['leftTachometerData/rotationSpeed'].value === '---' && data['rightTachometerData/rotationSpeed'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, null]
                if (data['leftTachometerData/rotationSpeed'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, data['rightTachometerData/rotationSpeed'].value]
                if (data['rightTachometerData/rotationSpeed'].value === '---') return [data.timestamp.rawValue + 9 * 60 * 60 * 1000, data['leftTachometerData/rotationSpeed'].value]
                return [data['timestamp'].rawValue + 9 * 60 * 60 * 1000, (data['leftTachometerData/rotationSpeed'].value + data['rightTachometerData/rotationSpeed'].value) / 2]
            })
        },
    ]

    
    const options2 = {
        chart: {
            zoom: {
                enabled: false,
            },
            animations: {
                easing: 'linear',
                dynamicAnimation: {
                    speed: 500,
                },
                animateGradually: {
                    enabled: false
                }
            },
            toolbar: {
                show: false,
            },
            brush: {
                target: "mainChart",
                enabled: true
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: startTime - 300000,
                    max: startTime,
                }
            },
            events: {
                brushScrolled: (chartContext, { xaxis }) => {
                    //setRange(xaxis.max - xaxis.min);
                    //setStartTiem(xaxis.max);
                }
            },
        },
        tooltip: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            max: log[log.length - 1] && log[log.length - 1].timestamp.rawValue + 9 * 60 * 60 * 1000,
            min: log[0] && log[0].timestamp.rawValue + 9 * 60 * 60 * 1000,
        },
        yaxis: {
            tickAmount: 2,
        },
        theme: {
            mode: 'dark',
        },
        legend: {
            show: false,
        }
    }
    return (
        <div css={css`height:50%`} >
            <Chart type='line' options={options} series={data} height='80%' />
            <Chart type='line' options={options2} series={data} height='20%' />
        </div>
    )
})

const options = {
    chart: {
        id: "mainChart",
        zoom: {
            enabled: true,
        },
        animations: {
            easing: 'linear',
            dynamicAnimation: {
                speed: 500,
            },
            animateGradually: {
                enabled: false
            }
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        x: {
            format: 'yyyy/MM/dd HH:mm:ss',
        },
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: [
        {
            show: false,
            seriesName: '対気速'
        },
        {
            labels: {
                formatter: val => val && val.toFixed(2)
            },
            title: { text: '高度m / 対気速m/s' },
            seriesName: '対気速'
        },
        {
            labels: {
                formatter: val => val && val
            },
            title: { text: '出力W / 回転数rpm' },
            seriesName: '出力左',
            opposite: true
        },
        {
            seriesName: '出力左',
            show: false,
        },
        {
            seriesName: '出力左',
            show: false,
        }
    ],
    theme: {
        mode: 'dark',
    }
}

export default Graph
