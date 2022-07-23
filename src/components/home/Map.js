import React, { useCallback, useEffect, useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { getAircraftLatLng } from '../../utils/logData';
import MapCircles from './map/MapCircles';
import MapLines from './map/MapLines';
import MapMarker from './map/MapMarker';
import PlaneMarker from './map/PlaneMarker';
import PlanePath from './map/PlanePath';
import TrackPlaneButton from './map/TrackPlaneControl';

const Map = React.memo(({ log }) => {
    const [isTrack, setIsTrack] = useState(true)
    const [isMoveFromFunc, setIsMoveFromFunc] = useState(false)
    const [view, setView] = useState({
        latitude: 35.294230,
        longitude: 136.254345,
        pitch: 60,
        zoom: 17,
        bearing: 0
    })
    const latestData = log && log.filter(e => e['dataStationData/latitude'].value !== '---' && e['dataStationData/longitude'].value !== '---').slice(-1)[0];
    const currentPosition = getAircraftLatLng(latestData)
    const onMove = ({ viewState, type }) => {
        setView(viewState)
    }
    const onMoveStart = () => {
        setIsTrack(false)
    }
    const onMoveEnd = () => {
        if (isMoveFromFunc) setIsTrack(true)
        setIsMoveFromFunc(false)
    }
    const setIsMoveFromFuncRef = useCallback(setIsMoveFromFunc);
    const setIsTrackRef = useCallback(setIsTrack);
    useEffect(() => {
        if (isTrack) setView(currentView => ({ ...currentView, ...(currentPosition && currentPosition.latitude && currentPosition.longitude && currentPosition) }))
    }, [log, isTrack])
    return (
        <ReactMapGL
            {...view}
            onMove={onMove}
            onMoveStart={onMoveStart}
            onMoveEnd={onMoveEnd}
            maxPitch={85}
            mapStyle='https://api.maptiler.com/maps/jp-mierune-dark/style.json?key=5EnTPwXqoNrnkItfoiaZ'
        >
            <MapMarker />
            <PlanePath log={log} />
            <NavigationControl visualizePitch={true} />
            <TrackPlaneButton setIsTrack={setIsTrackRef} setIsMoveFromFunc={setIsMoveFromFuncRef} position={currentPosition} />
            <PlaneMarker position={currentPosition} pitch={view.pitch} view={view} />
            <MapLines />
            <MapCircles />
        </ReactMapGL>
    )
})

export default Map