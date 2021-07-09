import { Map } from '../features/map/Map'
import { Widgets } from '../features/widgets/Widgets'
import { useMapData } from '../utils/dataHooks'

export function App() {
  const { mapFeatures, gridItemData, clusters, isLoading } = useMapData()
  return (
    <main>
      <Map
        mapFeatures={mapFeatures}
        gridItemData={gridItemData}
        clusters={clusters}
        isLoading={isLoading}
      />
      <Widgets mapFeatures={mapFeatures} gridItemData={gridItemData} />
    </main>
  )
}
