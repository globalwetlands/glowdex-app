import './Map.css'

import { useCallback, useRef, useState } from 'react'
import {
  FlyToInterpolator,
  Layer,
  InteractiveMap as MapGL,
  NavigationControl,
  Source,
  WebMercatorViewport,
} from 'react-map-gl'
import { useDispatch } from 'react-redux'

import bbox from '@turf/bbox'

import { Spinner } from '../../common/Spinner'
import { hideMenuHelpText } from '../../redux/globalSettingsSlice'
import { useMapData } from '../../utils/dataHooks'
import MapLegend from './MapLegend'
import { Menu } from './Menu'
import { gridLayerStyle } from './mapStyles'

export function Map() {
  const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  const mapStyle =
    'mapbox://styles/ejinks-gu/ckhycntp61ol31am7qum156sk?optimize=true'
  const mapRef = useRef()

  const dispatch = useDispatch()

  const [viewport, setViewport] = useState({
    // width: 400,
    // height: 400,
    latitude: 20,
    longitude: 0,
    zoom: 2,
    minZoom: 2,
  })

  const [tooltip, setTooltip] = useState({})
  const { mapFeatures, clusterItems, isLoading } = useMapData({
    numberOfClusters: 5,
  })

  const fitBounds = useCallback(
    (feature) => {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature)

      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: { top: 100, bottom: 200, right: 100, left: 100 },
          offset: [0, 0],
        }
      )
      const updatedViewport = {
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        // transitionEasing: d3.easeCubic,
      }
      setViewport(updatedViewport)
    },
    [viewport]
  )

  const onHover = (e) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = e
    const hoveredFeature =
      features && features.find((f) => f.layer.id === 'data')

    setTooltip({
      hoveredFeature,
      x: offsetX,
      y: offsetY,
    })
  }

  const onMouseOut = () => {
    setTooltip({})
  }

  const onClick = (e) => {
    const { features } = e
    const clickedFeature =
      features && features.find((f) => f.layer.id === 'data')
    if (clickedFeature) {
      fitBounds(clickedFeature)
      dispatch(hideMenuHelpText())
    }
  }

  const renderTooltip = () => {
    const { hoveredFeature, x, y } = tooltip

    if (!hoveredFeature) {
      return null
    }

    const id = hoveredFeature.properties?.ID
    const cluster = hoveredFeature.properties?.cluster
    const name = `${id}`

    return (
      hoveredFeature && (
        <div className="Map--Tooltip" style={{ left: x, top: y }}>
          <div>
            <span>ID</span>
            <span className="Map--Tooltip--Value">{name}</span>
          </div>
          <div>
            <span>Cluster</span>
            <span className="Map--Tooltip--Value">{cluster}</span>
          </div>
        </div>
      )
    )
  }

  const getCursor = (e) => {
    if (e.isHovering) {
      return 'pointer'
    }
    if (e?.isDragging) {
      return 'grabbing'
    }
    if (tooltip?.hoveredFeature) {
      return 'crosshair'
    }
    return 'grab'
  }

  return (
    <div className="Map">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onHover={onHover}
        onMouseOut={onMouseOut}
        onClick={onClick}
        ref={mapRef}
        getCursor={getCursor}
      >
        <NavigationControl
          className="Map--NavigationControl"
          onViewportChange={setViewport}
        />

        <Source
          type="geojson"
          data={{ type: 'FeatureCollection', features: mapFeatures }}
        >
          <Layer {...gridLayerStyle} />
        </Source>

        {renderTooltip()}
      </MapGL>

      <div className="Map--Overlays">
        <Menu />
        {/* {!isLoading  && <MapLegend />} */}
      </div>

      {isLoading && (
        <Spinner
          style={{
            position: 'absolute',
            top: 'calc(50% - 33px)',
            left: 'calc(50% - 33px)',
          }}
        />
      )}
    </div>
  )
}
