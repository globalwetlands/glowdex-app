import './MapLegend.css'

import { useDispatch, useSelector } from 'react-redux'

import { SliderInput } from '../../common/SliderInput'
import { setNumberOfClusters } from '../../redux/globalSettingsSlice'

export function MapLegend({ clusters }) {
  const dispatch = useDispatch()
  const numberOfClusters = useSelector(
    (state) => state.globalSettings.numberOfClusters
  )

  return (
    <div className="MapLegend">
      <fieldset className="field" style={{ maxWidth: 300 }}>
        <label className="label" style={{ marginBottom: 18 }}>
          Number of Typologies: <span className="tag">{numberOfClusters}</span>
        </label>
        <div className="control">
          <SliderInput
            min={2}
            max={10}
            step={1}
            value={numberOfClusters}
            onChange={(value) => {
              dispatch(setNumberOfClusters(value))
            }}
            aria-label="Number of Clusters"
          />
        </div>
      </fieldset>

      <div className="MapLegend--Display">
        {clusters.map((cluster) => {
          return (
            <div
              className="MapLegend--ColourStop"
              key={`ColourStop-${cluster.n}`}
            >
              <div
                className="MapLegend--ColourBox"
                style={{
                  borderColor: cluster.color,
                  backgroundColor: cluster.fillColor,
                }}
              />
              <span className="MapLegend--Value">Typology {cluster.n}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
