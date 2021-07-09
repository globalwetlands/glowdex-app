import './Widgets.css'

import { useDispatch } from 'react-redux'

import { setSelectedGridItems } from '../../redux/gridItemsSlice'
import { useSelectedGridItemData } from '../../utils/dataHooks'
import { WidgetBox } from './WidgetBox'

export function Widgets() {
  const dispatch = useDispatch()

  const { selectedGridItemData } = useSelectedGridItemData()

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

  const { TERRITORY1, ID, clusterNumber } = gridItem

  return (
    <div className="Widgets--Box--Inner">
      <div className="Widgets--Box--Column">
        <div>Country: {TERRITORY1}</div>
        <div>ID: {ID}</div>
        <div>Cluster: {clusterNumber}</div>

        <p>Now to visualise this data...</p>
        <div style={{ height: 300, overflow: 'scroll' }}>
          <pre>
            <code>{JSON.stringify(gridItem, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
