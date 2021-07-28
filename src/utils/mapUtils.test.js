import { formatCoordinate, getBboxCenter } from './mapUtils'

// a function that generates 10 random bounding box lat/lng pairs
function randomBbox() {
  const lats = [Math.random() * 90 - 45, Math.random() * 90 - 45]
  const maxLat = Math.max(...lats)
  const minLat = Math.min(...lats)
  const lngs = [Math.random() * 180 - 180, Math.random() * 180 - 180]
  const maxLng = Math.max(...lngs)
  const minLng = Math.min(...lngs)

  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2
  return { minLng, minLat, maxLng, maxLat, centerLat, centerLng }
}

it('Gets the center of the bbox', () => {
  for (let bbox of [
    randomBbox(),
    randomBbox(),
    randomBbox(),
    randomBbox(),
    randomBbox(),
  ]) {
    expect(getBboxCenter(bbox)).toEqual({
      latitude: bbox.centerLat,
      longitude: bbox.centerLng,
    })
  }
})

// a test for the formatCoordinate function
it('Formats coordinates', () => {
  expect(formatCoordinate({ latitude: 0, longitude: 0 })).toEqual(
    `0° 0′ 0.0″ S 0° 0′ 0.0″ W`
  )
  expect(formatCoordinate({ latitude: 40.76, longitude: -73.984 })).toEqual(
    `40° 45′ 36.0″ N 73° 59′ 2.4″ W`
  )
  expect(formatCoordinate({ latitude: -40.76, longitude: 73.984 })).toEqual(
    `40° 45′ 36.0″ S 73° 59′ 2.4″ E`
  )
})
