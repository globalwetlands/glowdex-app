import useSWR from 'swr'

import { fetcher } from './dataUtils'

export function useMapFeatures() {
  const { data, error } = useSWR(
    `${process.env.PUBLIC_URL}/geojson/grid.geojson`,
    fetcher
  )
  const isLoading = !data

  const features = data?.features

  return {
    mapFeatures: features,
    isLoading,
  }
}
