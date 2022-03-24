import React, { useEffect, useState } from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { getAircraftLatLng } from '../../utils/logData';
import MapMarker from './map/MapMarker';
import PlanePath from './map/PlanePath';
import TrackPlaneButton from './map/TrackPlaneControl';
import PlaneMarker from './map/PlaneMarker';

const Map = React.memo(({ log }) => {
    const [isTrack, setIsTrack] = useState(true)
    const [isMoveFromFunc, setIsMoveFromFunc] = useState(false)
    const [view, setView] = useState({
            latitude: 35.55396,
            longitude: 139.46349,
            pitch: 60,
            zoom: 20,
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
            <TrackPlaneButton setIsTrack={setIsTrack} setIsMoveFromFunc={setIsMoveFromFunc} position={ currentPosition }/>
            <PlaneMarker position={currentPosition} pitch={view.pitch} view={view} />
        </ReactMapGL>
    )
})

export default Map