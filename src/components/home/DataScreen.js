import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Container, Row, Tab, Tabs } from 'react-bootstrap';
import Datacard from './DataCard';
import './tab.css';

const DataScreen = ({ log }) => {
    const [tabKey, setTabKey] = useState('summary');
    const onChangeTab = (key) => {
        setTabKey(key)
    };
    const latestLogData = log && log[log.length - 1];
    const summaryName = ['dataStationData/pitch', 'dataStationData/roll', 'dataStationData/yaw']
    const summary = summaryName.map(key => {

        return latestLogData && latestLogData[key]
    })
    return (
        <div css={styles.wrap}>
            <Tabs
                activeKey={tabKey}
                onSelect={onChangeTab}
            >
                <Tab eventKey='summary' title='Summary'>
                    <Container fluid>
                        <Row xs={1} md={2}>
                            {summary.map((val, key) => (<Datacard data={val} key={key} />))}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='all' title='All'>
                    <Container fluid>
                        <Row xs={1} md={2}>
                            {latestLogData && Object.keys(latestLogData).map((key) => (< Datacard data={latestLogData[key]} key={key} />))}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey='battery' title='Battery'>
                    バッテリー
                </Tab>
            </Tabs>
            {/* <TabPanel value='' */}
        </div>
    )
}

const styles = {
    wrap: css({
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }),
}

export default DataScreen