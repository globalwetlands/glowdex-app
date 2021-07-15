import './Widgets.css'

import { useDispatch } from 'react-redux'

import { setSelectedGridItems } from '../../redux/gridItemsSlice'
import { useSelectedGridItemData } from '../../utils/dataHooks'
import { WidgetBox } from './WidgetBox'
import { TypologyBoxPlot } from './charts/TypologyBoxPlot'

export function Widgets({
  mapFeatures,
  gridItems,
  clusters,
  gridItemsPerCluster,
}) {
  const dispatch = useDispatch()

  const { selectedGridItemData } = useSelectedGridItemData({
    mapFeatures,
    gridItems,
  })

  return (
    <>
      {!!selectedGridItemData?.length && (
        <div className="Widgets--Wrap">
          <WidgetBox onClose={() => dispatch(setSelectedGridItems([]))}>
            <GridItemWidget
              selectedGridItemData={selectedGridItemData}
              clusters={clusters}
              gridItemsPerCluster={gridItemsPerCluster}
              gridItems={gridItems}
            />
          </WidgetBox>
        </div>
      )}
    </>
  )
}

function GridItemWidget({
  selectedGridItemData,
  gridItems,
  clusters,
  gridItemsPerCluster,
}) {
  const gridItem = selectedGridItemData?.[0]

  const { TERRITORY1, ID, clusterNumber, color, fillColor } = gridItem

  const cluster = clusters.find(({ n }) => n === clusterNumber)

  return (
    <div className="Widgets--Box--Inner">
      <div className="Widgets--Box--Column content">
        <h3>{TERRITORY1}</h3>

        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag">ID</span>
              <span className="tag is-light has-text-weight-bold">{ID}</span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag">Typology</span>
              <span
                className="tag"
                style={{
                  backgroundColor: fillColor,
                  border: `1px solid ${color}`,
                  fontWeight: 600,
                }}
              >
                {clusterNumber}
              </span>
            </div>
          </div>
        </div>

        <TypologyBoxPlot
          cluster={cluster}
          gridItems={gridItemsPerCluster[clusterNumber]}
          gridItem={gridItem}
        />
      </div>
    </div>
  )
}
