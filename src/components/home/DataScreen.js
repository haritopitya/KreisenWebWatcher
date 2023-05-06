import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Container, Row, Tab, Tabs } from 'react-bootstrap';
import Datacard from './DataCard';
import './tab.css';
import coordinates from './map/coordinates';
import { getDistance } from '../../utils/coordinate'
import { color } from '../../utils/logDataFormatter'
import { faFlag } from '@fortawesome/free-solid-svg-icons'


const DataScreen = ({ currentData }) => {
    const [tabKey, setTabKey] = useState('summary');
    const onChangeTab = (key) => {
        setTabKey(key)
    };
    const summaryName = [
        'speedometerData/airSpeed',
        'altimeterData/altitude',
        'leftTachometerData/power',
        'rightTachometerData/power',
        'leftTachometerData/rotationSpeed',
        'rightTachometerData/rotationSpeed',
        'dataStationData/groundSpeed',
        'timestamp'
    ]
    const summary = summaryName.map(key => {
        return (currentData && currentData[key]) || null
    })
    return (
        <div css={styles.wrap}>
            <Tabs
                activeKey={tabKey}
                onSelect={onChangeTab}
            >
                <Tab eventKey='summary' title='Summary'>
                    <Container fluid>
                        <Row xs={1} xxl={2} >
                            {summary.map((val, key) => (<Datacard data={val} key={key} />))}
                            {createDistance(currentData && {
                                lat: parseFloat(currentData['dataStationData/latitude'].value),
                                lng: parseFloat(currentData['dataStationData/longitude'].value)
                            })}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='all' title='All'>
                    <Container fluid>
                        <Row xs={1} xxl={2}>
                            {currentData && Object.keys(currentData).map((key) => (<Datacard data={currentData[key]} key={key} />))}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='battery' title='Battery'>
                    <Container fluid>
                        <Row xs={1} xxl={2}>
                            {currentData && Object.keys(currentData).map((key) => (currentData[key].isBattery && <Datacard data={currentData[key]} key={key} />))}
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
            {/* <TabPanel value='' */}
        </div>
    )
}

const createDistance = (aircraftLatLng) => {
    const target = [
        {
            title: 'プラホからの距離',
            key: 'fromPlatform',
            pos: coordinates.Platform,
        },
        {
            title: '沖島ポイントからの距離',
            icon: faFlag,
            key: 'fromOkiIslandPoint',
            pos: coordinates.OkiIslandPoint,
        },
        {
            title: '竹生島ポイントからの距離',
            key: 'fromChikubuIslandPoint',
            pos: coordinates.ChikubuIslandPoint,
        },

    ]
    console.log(aircraftLatLng);
    const data = target.map(({ title, key, pos }) => {
        const dist =
            aircraftLatLng && aircraftLatLng.lat > 0 && aircraftLatLng.lng > 0 ?
                (getDistance(pos, aircraftLatLng) / 1000).toFixed(3) : '---'
        return {
            title,
            icon: faFlag,
            value: dist,
            unit: 'km',
            color: color.distance,
            key: `distance/${key}`,
            visible: true,
        }
    })
    return data.map((value) => <Datacard data={value} />)

}

const styles = {
    wrap: css({
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }),
}

export default DataScreen