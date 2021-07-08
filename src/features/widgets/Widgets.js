import './Widgets.css'

import { useSelector } from 'react-redux'

import { WidgetBox } from './WidgetBox'

export function Widgets() {
  const selectedGridItems = useSelector(
    (state) => state.gridItems.selectedGridItems
  )

  return (
    <>
      {!!selectedGridItems?.length && (
        <div className="Widgets--Wrap">
          <WidgetBox onClose={() => {}}>
            <p>Hello Widgets</p>
          </WidgetBox>
        </div>
      )}
    </>
  )
}
