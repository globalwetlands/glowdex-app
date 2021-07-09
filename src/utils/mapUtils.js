export function getBboxCenter({ minLng, minLat, maxLng, maxLat }) {
  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2
  return { latitude: centerLat, longitude: centerLng }
}
