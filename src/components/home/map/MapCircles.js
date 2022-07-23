import React from 'react'
import { Layer, Source } from 'react-map-gl'
import * as turf from "@turf/turf";
import coordinates from './coordinates'

const MapCircles = React.memo(() => {
    const circleData = circleGeojson([1, 5, 10, 15, 18])
    return (
        <>
            <Source type='geojson' data={circleData}>
                <Layer {...okiIslandCircleLayer} />
            </Source>
        </>
    )
})

const circleGeojson = (radiuses) => {
    const point = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [coordinates.Platform.lng, coordinates.Platform.lat],
        },
        properties: {
            distance: 1
        }
    }
    const features = radiuses.map((e) => turf.buffer(point, e, { units: 'kilometers' }))
    return {
        type: 'FeatureCollection',
        features: features
    }
}

const okiIslandCircleLayer = {
    'type': 'line',
    'paint': {
        'line-color': 'lightgray',
        'line-width': 1,
    }
}

export default MapCircles