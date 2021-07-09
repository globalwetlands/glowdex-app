export const gridLayerStyle = {
  id: 'gridItems',
  type: 'fill',
  paint: {
    'fill-opacity': 1,
    'fill-outline-color': ['get', 'color'],
    'fill-color': ['get', 'fillColor'],
  },
}

export const gridLayerHoverStyle = {
  id: 'gridItemsHighlighted',
  type: 'fill',
  paint: {
    'fill-opacity': 1,
    'fill-outline-color': ['get', 'color'],
    'fill-color': ['get', 'color'],
  },
}

export const gridLayerSelectedStyle = {
  id: 'gridItemsSelected',
  type: 'fill',
  paint: {
    'fill-opacity': 1,
    'fill-outline-color': ['get', 'color'],
    'fill-color': ['get', 'color'],
  },
}
