import React from 'react'
import { Layer, Source } from 'react-map-gl'
import coordinates from './coordinates'

const MapLines = React.memo(() => {
    return (
        <>
            <Source type='geojson' data={rootGeojson}>
                <Layer {...rootLayerStyle} />
            </Source>
            <Source type='geojson' data={centerLineGeojson}>
                <Layer {...centerLineLayerStyle} />
            </Source>
        </>
    )
})

const rootGeojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [[coordinates.Platform.lng, coordinates.Platform.lat], [coordinates.ChikubuIslandPoint.lng, coordinates.ChikubuIslandPoint.lat]]
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [[coordinates.Platform.lng, coordinates.Platform.lat], [coordinates.OkiIslandPoint.lng, coordinates.OkiIslandPoint.lat]]
            }
        },
    ]
}

const rootLayerStyle = {
    'type': 'line',
    'paint': {
        'line-color': 'magenta',
        'line-width': 4
    }
}

const centerLineGeojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [[coordinates.Platform.lng, coordinates.Platform.lat], [coordinates.CenterlinePoint.lng, coordinates.CenterlinePoint.lat]]
            }
        }
    ]
}

const centerLineLayerStyle = {
    'type': 'line',
    'paint': {
        'line-color': 'lightgray',
        'line-width': 4,
        'line-dasharray': [2, 4],
    }
}

export default MapLines