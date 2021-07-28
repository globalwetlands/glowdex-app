import ReactSplit, { SplitDirection } from '@devbookhq/splitter'

import { Map } from '../features/map/Map'
import { Widgets } from '../features/widgets/Widgets'
import { useMapData } from '../utils/dataHooks'
import styles from './App.module.css'

const initialPanelSizes = [40, 60]

export function App() {
  const { mapFeatures, gridItems, clusters, gridItemsPerCluster, isLoading } =
    useMapData()
  return (
    <main className={styles.main}>
      <ReactSplit
        direction={SplitDirection.Horizontal}
        initialSizes={initialPanelSizes}
        minWidth={300}
        gutterClassName={styles.ReactSplitGutterHorizontal}
        draggerClassName={styles.ReactSplitDraggerHorizontal}
      >
        <Widgets
          mapFeatures={mapFeatures}
          gridItems={gridItems}
          clusters={clusters}
          isLoading={isLoading}
          gridItemsPerCluster={gridItemsPerCluster}
        />
        <Map
          mapFeatures={mapFeatures}
          gridItems={gridItems}
          clusters={clusters}
          isLoading={isLoading}
        />
      </ReactSplit>
    </main>
  )
}
