import { X as CloseIcon } from 'react-feather'

import { IconButton } from '../../common/IconButton'

export function WidgetBox({ children, onClose, ...props }) {
  return (
    <div className="Widgets--Box" {...props}>
      <IconButton
        Icon={CloseIcon}
        className="Widgets--Box--CloseButton"
        onClick={onClose}
      />
      {children}
    </div>
  )
}
