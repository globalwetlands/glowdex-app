import './MapLegend.css'

import { useDispatch, useSelector } from 'react-redux'

import {
  setNumberOfClusters,
  toggleEnabledHabitat,
} from '../../redux/globalSettingsSlice'

export function MapLegend({ clusters }) {
  const dispatch = useDispatch()
  const numberOfClusters = useSelector(
    (state) => state.globalSettings.numberOfClusters
  )

  const enabledHabitats = useSelector(
    (state) => state.globalSettings.enabledHabitats
  )

  function HabitatCheckbox({ title, name }) {
    function toggleHabitat(e) {
      const habitat = e.target.name
      dispatch(toggleEnabledHabitat(habitat))
    }

    return (
      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            name={name}
            onChange={toggleHabitat}
            checked={enabledHabitats.includes(name)}
          />
          {title}
        </label>
      </div>
    )
  }

  return (
    <div className="MapLegend">
      <fieldset className="field" style={{ maxWidth: 330 }}>
        <label className="label">Number of Typologies</label>

        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="number_typologies"
              checked={numberOfClusters === 5}
              aria-label={`Number of typologies: ${5}`}
              onChange={() => {
                dispatch(setNumberOfClusters(5))
              }}
            />
            5
          </label>
          <label className="radio">
            <input
              type="radio"
              name="number_typologies"
              checked={numberOfClusters === 18}
              aria-label={`Number of typologies: ${18}`}
              onChange={() => {
                dispatch(setNumberOfClusters(18))
              }}
            />
            18
          </label>
        </div>
      </fieldset>

      <div className="MapLegend--Display block">
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
              >
                <span className="MapLegend--Value">{cluster.n}</span>
              </div>
            </div>
          )
        })}
      </div>

      <fieldset className="field">
        <label className="label">Habitats</label>
        <HabitatCheckbox title="Mangroves" name="mg" />
        <HabitatCheckbox title="Saltmarsh" name="sm" />
        <HabitatCheckbox title="Seagrass" name="sg" />
      </fieldset>
    </div>
  )
}
