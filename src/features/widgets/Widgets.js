import './Widgets.css'

import { useSelectedGridItemData } from '../../utils/dataHooks'
import { GridItemWidget } from './GridItemWidget'
import { MapLegend } from './MapLegend'
import { Menu } from './Menu'
import { WidgetBox } from './WidgetBox'

export function Widgets({
  mapFeatures,
  gridItems,
  clusters,
  isLoading,
  gridItemsPerCluster,
}) {
  const { selectedGridItemData } = useSelectedGridItemData({
    mapFeatures,
    gridItems,
  })

  return (
    <div className="Widgets--Wrap">
      <Menu />

      {!isLoading && (
        <WidgetBox>
          <MapLegend clusters={clusters} />
        </WidgetBox>
      )}

      {!!selectedGridItemData?.length && (
        <WidgetBox>
          <GridItemWidget
            selectedGridItemData={selectedGridItemData}
            clusters={clusters}
            gridItemsPerCluster={gridItemsPerCluster}
            gridItems={gridItems}
          />
        </WidgetBox>
      )}
    </div>
  )
}
