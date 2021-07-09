import { getBboxCenter } from './mapUtils'

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
