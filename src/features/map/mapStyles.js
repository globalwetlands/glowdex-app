export const gridLayerStyle = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-opacity': 1,
    'fill-outline-color': ['get', 'color'],
    'fill-color': ['get', 'fillcolor'],
  },
}
