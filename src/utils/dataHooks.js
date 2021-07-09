import _ from 'lodash'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

import { getBrewerColors } from './colorUtils'
import { fetcher, fetcherCsv } from './dataUtils'

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
  // change cluster data types to Integers
  const groupedByClusterN = _.groupBy(allClusters, 'nclust')
  const clusterItems = groupedByClusterN?.[numberOfClusters]?.map(
    ({ ID, Cluster, nclust }) => ({
      ID: parseInt(ID),
      cluster: parseInt(Cluster),
      nclust: parseInt(nclust),
    })
  )

  const clusterItemsObj = _.keyBy(clusterItems, 'ID')

  return clusterItemsObj
}

function generateMapFeatures({ mapFeatures, clusterItems, clusters }) {
  function addFeatureProps(feature) {
    // Add cluster item props to feature
    const matchingClusterItem = clusterItems?.[feature.properties.ID]
    const cluster = clusters.find(({ n }) => n === matchingClusterItem?.cluster)

    const { color, fillColor, n } = cluster

    return {
      ...feature,
      properties: {
        ...feature.properties,
        clusterNumber: n,
        color,
        fillColor,
        value: n,
      },
    }
  }

  return mapFeatures.map(addFeatureProps)
}

function generateClusters({ numberOfClusters }) {
  const colors = getBrewerColors()
  const fillColors = getBrewerColors({ alpha: 0.4 })

  const clusters = _.range(1, numberOfClusters + 1).map((n) => {
    const color = colors[(n - 1) % colors.length]
    const fillColor = fillColors[(n - 1) % colors.length]
    return { n, color, fillColor }
  })

  return clusters
}

export function useMapData() {
  const numberOfClusters = useSelector(
    (state) => state.globalSettings.numberOfClusters
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

  const isLoading = useMemo(
    () => !gridGeojson || !allClusters,
    [allClusters, gridGeojson]
  )

  const clusters = useMemo(
    () => generateClusters({ numberOfClusters }),
    [numberOfClusters]
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

  const mapFeatures = useMemo(() => {
    if (gridGeojson?.features && !_.isEmpty(clusterItems)) {
      console.time('generateMapFeatures')

      const mapFeatures = generateMapFeatures({
        clusterItems,
        clusters,
        mapFeatures: gridGeojson?.features,
      })

      console.timeEnd('generateMapFeatures')
      return mapFeatures
    } else {
      return []
    }
  }, [clusterItems, clusters, gridGeojson?.features])

  const gridLayerStyle = useMemo(() => {
    const gridLayerStyle = generateGridLayerStyle({
      clusters,
    })
    return gridLayerStyle
  }, [clusters])

  return {
    mapFeatures,
    allClusters,
    clusters,
    clusterItems,
    gridItemData,
    isLoading,
    gridLayerStyle,
  }
}

export function useSelectedGridItemData({ gridItemData, mapFeatures }) {
  // Returns the selected grid item data

  const selectedGridItems = useSelector(
    (state) => state.gridItems.selectedGridItems
  )

  const selectedGridItemData = useMemo(() => {
    if (selectedGridItems?.length && gridItemData?.length) {
      // for each selected ID, get the data for that ID
      const selectedGridItemsData = selectedGridItems.map((selectedID) => {
        // Find grid item data by ID
        const gridItem = gridItemData.find(
          ({ ID }) => selectedID === parseInt(ID)
        )
        // Find map feature props by ID
        const featureProps =
          mapFeatures.find((feature) => feature.properties.ID === selectedID)
            ?.properties || {}

        return { ...gridItem, ...featureProps }
      })
      return selectedGridItemsData
    } else {
      return []
    }
  }, [selectedGridItems, gridItemData, mapFeatures])
  return { selectedGridItemData }
}
