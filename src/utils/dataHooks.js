import _ from 'lodash'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

import bbox from '@turf/bbox'

import { availableNumberClusters } from '../redux/globalSettingsSlice'
import { opacify } from './colorUtils'
import { fetcher, fetcherCsv } from './dataUtils'
import { getBboxCenter } from './mapUtils'

export function generateGridLayerStyle({ clusters }) {
  const colors = clusters.map((cluster) => cluster.color)
  const fillColors = clusters.map((cluster) => cluster.fillColor)
  const clusterNumbers = clusters.map((cluster) => cluster.n)
  return {
    id: `gridItems`,
    type: 'fill',
    paint: {
      'fill-opacity': 1,
      // TODO: Add hover state
      'fill-outline-color': [
        'to-color',
        [
          'at',
          ['index-of', ['get', 'clusterNumber'], ['literal', clusterNumbers]],
          ['literal', colors],
        ],
      ],
      'fill-color': [
        'to-color',
        [
          'at',
          ['index-of', ['get', 'clusterNumber'], ['literal', clusterNumbers]],
          ['literal', fillColors],
        ],
      ],
    },
  }
}

function getClusterItems({ numberOfClusters, allClusters }) {
  if (!availableNumberClusters.includes(numberOfClusters)) {
    // set default number of clusters
    numberOfClusters = availableNumberClusters[0]
  }
  // change cluster data types to Integers
  const clusterCol = `cluster_${numberOfClusters}`
  const colorCol = `hex_${numberOfClusters}`
  const clusterItems = allClusters
    ?.map((item) => {
      return {
        ID: parseInt(item.ID, 10),
        cluster: parseInt(item?.[clusterCol], 10),
        color: item?.[colorCol],
        mang_presence: item.mang_presence,
        salt_presence: item.salt_presence,
        seag_presence: item.seag_presence,
      }
    })
    .filter((item) => !_.isNaN(item.cluster))

  const clusterItemsObj = _.keyBy(clusterItems, 'ID')
  return clusterItemsObj
}

function generateMapFeatures({
  mapFeatures,
  clusterItems,
  clusters,
  enabledHabitats,
}) {
  function checkHabitatPresence(item) {
    const habitatKey = {
      mg: 'mang_presence',
      sm: 'salt_presence',
      sg: 'seag_presence',
    }
    const hasHabitatPresence = _.some(
      enabledHabitats,
      (key) => item[habitatKey[key]] === 1
    )
    return hasHabitatPresence
  }

  function addFeatureProps(allFeatures, feature) {
    // Add cluster item props to feature
    const matchingClusterItem = clusterItems?.[feature.properties.ID]

    // Filter out if no habitat presence
    const hasHabitatPresence = checkHabitatPresence(matchingClusterItem)
    if (!hasHabitatPresence) {
      return allFeatures
    }

    const cluster = clusters.find(({ n }) => n === matchingClusterItem?.cluster)

    const { color, fillColor, n } = cluster

    allFeatures.push({
      ...feature,
      properties: {
        ...feature.properties,
        clusterNumber: n,
        color,
        fillColor,
        value: n,
      },
    })
    return allFeatures
  }

  return mapFeatures.reduce(addFeatureProps, [])
}

function generateClusters({ clusterItems }) {
  const clusterItemsArr = clusterItems ? Object.values(clusterItems) : []
  const uniqClusters = _.chain(clusterItemsArr)
    .uniqBy('cluster')
    .sortBy('cluster')
    .value()
  const clusters = uniqClusters.map(({ cluster, color }) => {
    const fillColor = opacify({ color, alpha: 0.3 })
    return { n: cluster, color, fillColor }
  })

  return clusters
}

export function useMapData() {
  const numberOfClusters = useSelector(
    (state) => state.globalSettings.numberOfClusters
  )
  const enabledHabitats = useSelector(
    (state) => state.globalSettings.enabledHabitats
  )
  const { data: gridGeojson } = useSWR(
    `${process.env.PUBLIC_URL}/data/grid.geojson`,
    fetcher
  )
  const { data: allClusters } = useSWR(
    `${process.env.PUBLIC_URL}/data/all-clusters.csv`,
    fetcherCsv
  )
  const { data: gridItemData } = useSWR(
    `${process.env.PUBLIC_URL}/data/grid-items.csv`,
    fetcherCsv
  )
  const { data: gridItemResidualsData } = useSWR(
    `${process.env.PUBLIC_URL}/data/grid-items-residuals.csv`,
    fetcherCsv
  )

  const gridItems = useMemo(() => {
    if (gridItemData && gridItemResidualsData) {
      return gridItemData.map((gridItem) => {
        const residuals = gridItemResidualsData.find(
          ({ ID }) => ID === gridItem.ID
        )
        return {
          ...gridItem,
          residuals,
        }
      })
    } else {
      return []
    }
  }, [gridItemData, gridItemResidualsData])

  const isLoading = useMemo(
    () => !gridGeojson || !allClusters,
    [allClusters, gridGeojson]
  )

  const clusterItems = useMemo(() => {
    if (allClusters?.length) {
      console.time('getClusterItems')
      const clusterItems = getClusterItems({
        numberOfClusters,
        allClusters,
      })
      console.timeEnd('getClusterItems')
      return clusterItems
    }
  }, [allClusters, numberOfClusters])

  const clusters = useMemo(
    () => generateClusters({ clusterItems }),
    [clusterItems]
  )

  const mapFeatures = useMemo(() => {
    if (
      gridGeojson?.features &&
      !_.isEmpty(clusterItems) &&
      !_.isEmpty(clusters)
    ) {
      console.time('generateMapFeatures')

      const mapFeatures = generateMapFeatures({
        clusterItems,
        clusters,
        mapFeatures: gridGeojson?.features,
        enabledHabitats,
      })

      console.timeEnd('generateMapFeatures')
      return mapFeatures
    } else {
      return []
    }
  }, [clusterItems, clusters, gridGeojson?.features, enabledHabitats])

  const gridLayerStyle = useMemo(() => {
    const gridLayerStyle = generateGridLayerStyle({
      clusters,
    })
    return gridLayerStyle
  }, [clusters])

  const gridItemsPerCluster = useMemo(() => {
    if (gridItems && clusterItems) {
      console.time('gridItemsPerCluster')
      const gridItemsPerCluster = _.groupBy(gridItems, ({ ID }) => {
        return clusterItems?.[parseInt(ID)]?.cluster
      })
      console.timeEnd('gridItemsPerCluster')
      return gridItemsPerCluster
    } else {
      return undefined
    }
  }, [clusterItems, gridItems])

  return {
    mapFeatures,
    allClusters,
    clusters,
    clusterItems,
    gridItems,
    isLoading,
    gridLayerStyle,
    gridItemsPerCluster,
  }
}

export function useSelectedGridItemData({ gridItems, mapFeatures }) {
  // Returns the selected grid item data

  const selectedGridItems = useSelector(
    (state) => state.globalSettings.selectedGridItems
  )

  const selectedGridItemData = useMemo(() => {
    const mapFeatureIds = mapFeatures.map((feature) => feature.properties.ID)

    if (selectedGridItems?.length && gridItems?.length) {
      // remove filtered out selectedItems
      const filteredSelectedGridItems = selectedGridItems.filter((selectedID) =>
        mapFeatureIds.includes(selectedID)
      )

      // for each selected ID, get the data for that ID
      const selectedGridItemsData = filteredSelectedGridItems.map(
        (selectedID) => {
          // Find grid item data by ID
          const gridItem = gridItems.find(
            ({ ID }) => selectedID === parseInt(ID)
          )
          // Find map feature props by ID
          const mapFeature = mapFeatures.find(
            (feature) => feature.properties.ID === selectedID
          )

          const [minLng, minLat, maxLng, maxLat] = bbox(mapFeature)
          const centerCoords = getBboxCenter({ minLng, minLat, maxLng, maxLat })
          const featureProps = mapFeature?.properties || {}

          return { ...gridItem, ...featureProps, centerCoords }
        }
      )
      return selectedGridItemsData
    } else {
      return []
    }
  }, [selectedGridItems, gridItems, mapFeatures])
  return { selectedGridItemData }
}
