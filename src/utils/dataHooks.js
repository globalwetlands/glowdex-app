import _ from 'lodash'
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

function generateMapFeatures({ mapFeatures, clusterItems }) {
  const colors = getBrewerColors()
  const fillColors = getBrewerColors({ alpha: 0.4 })

  function addFeatureProps(feature) {
    const matchingCluster = clusterItems.find(
      ({ ID }) => ID === feature.properties.ID
    )
    const cluster = matchingCluster?.cluster
    const color = colors[(cluster - 1) % colors.length]
    const fillcolor = fillColors[(cluster - 1) % colors.length]

    feature.properties = {
      ...feature.properties,
      cluster,
      color,
      fillcolor,
    }
    return feature
  }

  return mapFeatures.map(addFeatureProps)
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

  const isLoading = !gridGeojson || !allClusters

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
    if (gridGeojson?.features && !!clusterItems?.length) {
      return generateMapFeatures({
        clusterItems,
        mapFeatures: gridGeojson?.features,
      })
    }
  }, [clusterItems, gridGeojson?.features])

  return {
    mapFeatures,
    allClusters,
    clusterItems,
    isLoading,
  }
}
