import './Widgets.css'

import { useDispatch, useSelector } from 'react-redux'

import { SliderInput } from '../../common/SliderInput'
import { setTypologyBoxPlotQuantile } from '../../redux/globalSettingsSlice'
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
  const typologyBoxPlotQuantile = useSelector(
    (state) => state.globalSettings.typologyBoxPlotQuantile
  )

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

        <TypologyBoxPlotQuantileInput />

        <TypologyBoxPlot
          cluster={cluster}
          gridItems={gridItemsPerCluster[clusterNumber]}
          gridItem={gridItem}
          quantileValue={typologyBoxPlotQuantile}
        />
      </div>
    </div>
  )
}

function TypologyBoxPlotQuantileInput() {
  const dispatch = useDispatch()
  const typologyBoxPlotQuantile = useSelector(
    (state) => state.globalSettings.typologyBoxPlotQuantile
  )
  return (
    <fieldset className="field" style={{ maxWidth: 300 }}>
      <label className="label" style={{ marginBottom: 18 }}>
        Quantile for Typology Boxplot:{' '}
        <span className="tag">{typologyBoxPlotQuantile}</span>
      </label>
      <div className="control">
        <SliderInput
          min={0}
          max={0.99}
          step={0.05}
          value={typologyBoxPlotQuantile}
          onChange={(value) => {
            dispatch(setTypologyBoxPlotQuantile(value))
          }}
          aria-label="Number of Clusters"
        />
      </div>
    </fieldset>
  )
}
