export const gridLayerStyle = {
  id: 'gridItems',
  type: 'fill',
  paint: {
    'fill-opacity': 1,
    'fill-outline-color': ['get', 'color'],
    'fill-color': ['get', 'fillColor'],
  },
}
