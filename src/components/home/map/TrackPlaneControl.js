import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMap } from 'react-map-gl';

const TrackPlaneButton = ({setIsTrack,setIsMoveFromFunc,position}) => {
    const map = useMap();
    const onClick = () => {
        setIsTrack(true)
        setIsMoveFromFunc(true)
        map.current.flyTo({
            center:[position.longitude,position.latitude]
        })
    }

    return (
        <div className='mapboxgl-control-container'>
            <div className='mapboxgl-ctrl-top-left'>
                <div className='mapboxgl-ctrl mapboxgl-ctrl-group'>
                    <button onClick={onClick}>
                        <FontAwesomeIcon icon={faPlaneUp}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default TrackPlaneButton