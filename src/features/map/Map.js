import './Map.css'

import { useCallback, useMemo, useRef, useState } from 'react'
import {
  FlyToInterpolator,
  Layer,
  InteractiveMap as MapGL,
  NavigationControl,
  Source,
} from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'

import bbox from '@turf/bbox'

import { Spinner } from '../../common/Spinner'
import { setSelectedGridItems } from '../../redux/globalSettingsSlice'
import { getBboxCenter } from '../../utils/mapUtils'
import { delay } from '../../utils/utils'
import {
  gridLayerHoverStyle,
  gridLayerSelectedStyle,
  gridLayerStyle,
} from './mapStyles'

export function Map({ mapFeatures, gridItems, clusters, isLoading }) {
  const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  const mapStyle =
    'mapbox://styles/ejinks-gu/ckhycntp61ol31am7qum156sk?optimize=true'
  const mapRef = useRef()

  const dispatch = useDispatch()
  const selectedGridItems = useSelector(
    (state) => state.globalSettings.selectedGridItems
  )

  const [viewport, setViewport] = useState({
    // width: 400,
    // height: 400,
    latitude: 20,
    longitude: 0,
    zoom: 2,
    minZoom: 2,
  })

  const [hoveredFeature, setHoveredFeature] = useState({})

  const fitBounds = useCallback(
    async (feature, duration = 250) => {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature)
      const { longitude, latitude } = getBboxCenter({
        minLng,
        minLat,
        maxLng,
        maxLat,
      })

      const zoom = 5

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
      await delay(duration + 50)
      return
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

    setHoveredFeature({
      feature: hoveredFeature,
      x: offsetX,
      y: offsetY,
    })
  }

  const onMouseOut = () => {
    setHoveredFeature({})
  }

  const onClick = async (e) => {
    const { features } = e
    const clickedFeature =
      features && features.find((f) => f.layer.id === gridLayerStyle.id)
    if (clickedFeature) {
      const { ID } = clickedFeature.properties
      await fitBounds(clickedFeature)
      dispatch(setSelectedGridItems([ID]))
    }
  }

  const renderTooltip = () => {
    const { feature, x, y } = hoveredFeature

    if (!feature) {
      return null
    }

    const id = feature.properties?.ID
    const clusterNumber = feature.properties?.clusterNumber

    const gridItem = gridItems.find((item) => parseInt(item.ID) === id)

    const cluster = clusters.find(({ n }) => n === clusterNumber)

    return (
      feature && (
        <div className="Map--Tooltip" style={{ left: x, top: y }}>
          <div className="control">
            <div className="tags has-addons">
              <span className="tag">ID</span>
              <span className="tag has-text-weight-bold">{gridItem?.ID}</span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag">Country</span>
              <span className="tag has-text-weight-bold">
                {gridItem?.TERRITORY1}
              </span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag">Typology</span>
              <span
                className="tag"
                style={{
                  backgroundColor: cluster.fillColor,
                  border: `1px solid ${cluster.color}`,
                  fontWeight: 600,
                }}
              >
                {clusterNumber}
              </span>
            </div>
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
    if (hoveredFeature?.feature) {
      return 'crosshair'
    }
    return 'grab'
  }

  const hoveredFeatureFilter = useMemo(() => {
    // A filter that matches the hovered feature by ID
    return ['==', 'ID', hoveredFeature?.feature?.properties?.ID || false]
  }, [hoveredFeature])

  const selectedFeatureFilter = useMemo(() => {
    // A filter that matches the selected features by ID
    return ['in', ['get', 'ID'], ['literal', selectedGridItems]]
  }, [selectedGridItems])

  return (
    <div className="Map" data-testid="Map">
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
            <Layer {...gridLayerHoverStyle} filter={hoveredFeatureFilter} />
            <Layer {...gridLayerSelectedStyle} filter={selectedFeatureFilter} />
          </Source>
        )}

        {renderTooltip()}
      </MapGL>

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
