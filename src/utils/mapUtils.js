import formatcoords from 'formatcoords'

export function getBboxCenter({ minLng, minLat, maxLng, maxLat }) {
  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2
  return { latitude: centerLat, longitude: centerLng }
}

export function formatCoordinate({ latitude, longitude }) {
  return formatcoords(latitude, longitude).format('FFf', { decimalPlaces: 1 })
}
