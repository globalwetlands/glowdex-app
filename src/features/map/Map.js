import './Map.css'

import { useCallback, useRef, useState } from 'react'
import {
  FlyToInterpolator,
  Layer,
  InteractiveMap as MapGL,
  NavigationControl,
  Source,
} from 'react-map-gl'
import { useDispatch } from 'react-redux'

import bbox from '@turf/bbox'

import { Spinner } from '../../common/Spinner'
import { hideMenuHelpText } from '../../redux/globalSettingsSlice'
import { setSelectedGridItems } from '../../redux/gridItemsSlice'
import { getBboxCenter } from '../../utils/mapUtils'
import { MapLegend } from './MapLegend'
import { Menu } from './Menu'
import { gridLayerStyle } from './mapStyles'

export function Map({ mapFeatures, gridItemData, clusters, isLoading }) {
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

  const fitBounds = useCallback(
    (feature) => {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature)
      const { longitude, latitude } = getBboxCenter({
        minLng,
        minLat,
        maxLng,
        maxLat,
      })

      const zoom = 5
      const duration = 500

      const updatedViewport = {
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: duration,
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
      features && features.find((f) => f.layer.id === gridLayerStyle.id)

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
      features && features.find((f) => f.layer.id === gridLayerStyle.id)
    if (clickedFeature) {
      const { ID } = clickedFeature.properties
      fitBounds(clickedFeature)
      dispatch(setSelectedGridItems([ID]))
      dispatch(hideMenuHelpText())
    }
  }

  const renderTooltip = () => {
    const { hoveredFeature, x, y } = tooltip

    if (!hoveredFeature) {
      return null
    }

    const id = hoveredFeature.properties?.ID
    const clusterNumber = hoveredFeature.properties?.clusterNumber
    const name = `${id}`

    const gridItem = gridItemData.find((item) => parseInt(item.ID) === id)

    return (
      hoveredFeature && (
        <div className="Map--Tooltip" style={{ left: x, top: y }}>
          <div>
            <span>ID</span>
            <span className="Map--Tooltip--Value">{name}</span>
          </div>
          <div>
            <span>Cluster</span>
            <span className="Map--Tooltip--Value">{clusterNumber}</span>
          </div>
          <div>
            <span>Country</span>
            <span className="Map--Tooltip--Value">{gridItem?.TERRITORY1}</span>
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

        {!isLoading && (
          <Source
            type="geojson"
            data={{ type: 'FeatureCollection', features: mapFeatures }}
          >
            <Layer {...gridLayerStyle} />
          </Source>
        )}

        {renderTooltip()}
      </MapGL>

      <div className="Map--Overlays">
        <Menu />
        {!isLoading && <MapLegend clusters={clusters} />}
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
