import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import coordinates from './coordinates';

export default () => {
    return (
        <>
            {
                Object.keys(coordinates).map(e => (coordinates[e].show &&
                    <>
                        <Marker longitude={coordinates[e].lng} latitude={coordinates[e].lat} />
                        <Popup longitude={coordinates[e].lng} latitude={coordinates[e].lat} css={{ color: 'black' }}>
                            {coordinates[e].name}
                        </Popup>
                    </>
                ))
            }
        </>
    )
}
