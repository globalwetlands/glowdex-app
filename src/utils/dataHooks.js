import _, { slice } from 'lodash'
import { useMemo } from 'react'
import useSWR from 'swr'

import { getBrewerColors } from './colorUtils'
import { fetcher, fetcherCsv } from './dataUtils'

function getClusterItems({ numberOfClusters, allClusters }) {
  // change cluster data types to Integers
  allClusters = allClusters?.map(({ ID, Cluster, nclust }) => ({
    ID: parseInt(ID),
    cluster: parseInt(Cluster),
    nclust: parseInt(nclust),
  }))
  const groupedByClusterN = _.groupBy(allClusters, 'nclust')
  return groupedByClusterN?.[numberOfClusters]
}

function generateMapFeatures({ mapFeatures, clusterItems, clusters }) {
  function addFeatureProps(feature) {
    // Add cluster item props to feature
    const matchingClusterItem = clusterItems.find(
      ({ ID }) => ID === feature.properties.ID
    )
    const cluster = clusters.find(({ n }) => n === matchingClusterItem?.cluster)

    const { color, fillColor, n } = cluster

    feature.properties = {
      ...feature.properties,
      clusterNumber: n,
      color,
      fillColor,
    }
    return feature
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

export function useMapData({ numberOfClusters = 2 } = {}) {
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

  const isLoading = !gridGeojson || !allClusters

  const clusters = useMemo(
    () => generateClusters({ numberOfClusters }),
    [numberOfClusters]
  )

  const clusterItems = useMemo(() => {
    if (allClusters?.length) {
      const getGroupedClusterItems = getClusterItems({
        numberOfClusters,
        allClusters,
      })
      return getGroupedClusterItems
    }
  }, [allClusters, numberOfClusters])

  const mapFeatures = useMemo(() => {
    if (gridGeojson?.features && clusterItems?.length) {
      console.time('generateMapFeatures')
      const mapFeatures = generateMapFeatures({
        clusterItems,
        clusters,
        mapFeatures: gridGeojson?.features,
      })

      console.timeEnd('generateMapFeatures')
      return mapFeatures
    }
  }, [clusterItems, clusters, gridGeojson?.features])

  return {
    mapFeatures,
    allClusters,
    clusters,
    clusterItems,
    gridItemData,
    isLoading,
  }
}
