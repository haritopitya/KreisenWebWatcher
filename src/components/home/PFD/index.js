
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import AirplaneSymbol from './AirplaneSymbol';
import AltitudeMeter from './AltitudeMeter';
import AttitudeGrid from './AttitudeGrid';
import Compass from './Compass';
import SpeedMeter from './SpeedMeter';

const PFD = ({ latestData }) => {
    const roll =latestData? latestData['dataStationData/roll'].value : 0;
    const pitch = latestData ? latestData['dataStationData/pitch'].value : 0;
    const direction = latestData ? latestData['dataStationData/yaw'].value : 0;
    const [speed, setSpeed] = useState(0);
    const [altitude, setAltitude] = useState(0);
    const styles = {
        wrap: css({
            height: '50%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'red',
            flexDirection: 'column',
            position: 'relative',
        }),
        attitudeIndicator: css({
            width: '400%',
            height: '100%',
            backgroundColor: 'green',
            overflow: 'visible',
            transform: `rotate(${-roll}deg) translateY(${-350 + 1.5 * pitch}%)`,
        }),
        topAttitudeIndicator: css({
            height: '400%',
            backgroundColor: 'blue',
            borderBottom: '2px solid black',
        }),
        bottomAttitudeIndicator: css({
            height: '400%',
            backgroundColor: 'saddlebrown',
            borderTop: '2px solid black',
        })
    };
    return (
        <div css={styles.wrap}>
            <div css={styles.attitudeIndicator}>
                <div css={styles.topAttitudeIndicator} />
                <div css={styles.bottomAttitudeIndicator} />
            </div>
            <AttitudeGrid roll={roll} pitch={pitch} />
            <AirplaneSymbol />
            <SpeedMeter speed={speed} />
            <AltitudeMeter altitude={altitude} />
            <Compass direction={direction} />
        </div>
    )
}

export default PFD