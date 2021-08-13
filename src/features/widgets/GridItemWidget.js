import { useDispatch, useSelector } from 'react-redux'

import { SliderInput } from '../../common/SliderInput'
import { setTypologyBoxPlotQuantile } from '../../redux/globalSettingsSlice'
import { formatCoordinate } from '../../utils/mapUtils'
import { TypologyBoxPlot } from './charts/TypologyBoxPlot'

export function GridItemWidget({
  selectedGridItemData,
  gridItems,
  clusters,
  gridItemsPerCluster,
}) {
  const typologyBoxPlotQuantile = useSelector(
    (state) => state.globalSettings.typologyBoxPlotQuantile
  )

  const gridItem = selectedGridItemData?.[0]

  const { TERRITORY1, ID, clusterNumber, color, fillColor, centerCoords } =
    gridItem

  const cluster = clusters.find(({ n }) => n === clusterNumber)

  return (
    <div className="Widgets--Box--Inner">
      <div className="content">
        <h3>{TERRITORY1}</h3>
        <h6 className="tag">{formatCoordinate(centerCoords)}</h6>

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

        <div className="block">
          <TypologyBoxPlotQuantileInput />
        </div>

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
        Quantile for Typology Violin Plot:{' '}
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
