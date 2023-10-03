import React, { useRef, useEffect } from 'react'

import Map from 'ol/Map'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'

import './Map.css'

const OLMap = (props) => {
  const mapRef = useRef()

  const { center, zoom } = props

  useEffect(() => {
    const openLayersCenter = fromLonLat([center.lng, center.lat])
    if (!mapRef.current.hasChildNodes()) {
      new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: openLayersCenter,
          zoom: zoom,
        }),
      })
    }
  }, [mapRef, center.lng, center.lat, zoom])

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  )
}

export default OLMap
