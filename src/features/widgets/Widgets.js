import './Widgets.css'

import { useDispatch } from 'react-redux'

import { setSelectedGridItems } from '../../redux/gridItemsSlice'
import { useSelectedGridItemData } from '../../utils/dataHooks'
import { WidgetBox } from './WidgetBox'

export function Widgets({ mapFeatures, gridItemData }) {
  const dispatch = useDispatch()

  const { selectedGridItemData } = useSelectedGridItemData({
    mapFeatures,
    gridItemData,
  })

  return (
    <>
      {!!selectedGridItemData?.length && (
        <div className="Widgets--Wrap">
          <WidgetBox onClose={() => dispatch(setSelectedGridItems([]))}>
            <GridItemWidget selectedGridItemData={selectedGridItemData} />
          </WidgetBox>
        </div>
      )}
    </>
  )
}

function GridItemWidget({ selectedGridItemData }) {
  const gridItem = selectedGridItemData?.[0]

  const { TERRITORY1, ID, clusterNumber, color, fillColor } = gridItem

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
              <span className="tag">Cluster</span>
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

        <p>Now to visualise some data...</p>

        <div style={{ height: 200, overflow: 'scroll' }}>
          <table className="table" style={{ position: 'relative' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(gridItem).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
