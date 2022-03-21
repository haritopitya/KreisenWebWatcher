import React from 'react'
import { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons'

const PlaneMarker = ({ position, pitch, view }) => {
    return (
        <>
            {position && position.latitude && position.longitude && (
                <Marker {...position}>
                    <FontAwesomeIcon
                        icon={faPlaneUp}
                        color='blue'
                        size='4x'
                        style={{
                            transform: `rotateX(${pitch}deg) rotate(${(position.bearing || 0)-view.bearing}deg)`
                        }}
                    />
                </Marker>
            )}
        </>

    )
}

export default PlaneMarker