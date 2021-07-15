import { Map } from '../features/map/Map'
import { Widgets } from '../features/widgets/Widgets'
import { useMapData } from '../utils/dataHooks'

export function App() {
  const { mapFeatures, gridItems, clusters, gridItemsPerCluster, isLoading } =
    useMapData()
  return (
    <main>
      <Map
        mapFeatures={mapFeatures}
        gridItems={gridItems}
        clusters={clusters}
        isLoading={isLoading}
      />
      <Widgets
        mapFeatures={mapFeatures}
        gridItems={gridItems}
        clusters={clusters}
        gridItemsPerCluster={gridItemsPerCluster}
      />
    </main>
  )
}
