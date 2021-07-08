import './Menu.css'

import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import { IconButton } from '../../common/IconButton'
import { Popup } from '../../common/Popup'

const MenuPopupContent = () => (
  <div>
    <h4>Hello World</h4>
    <p></p>
  </div>
)

const MenuIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="11.5"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )
}

export function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const showMenuHelpText = useSelector(
    (state) => state.globalSettings.showMenuHelpText
  )

  const menuPopupTitle = 'Glowdex App'

  const openMenu = () => {
    setMenuIsOpen(true)
  }

  return (
    <Fragment>
      <div className="Menu--MenuButtonWrap" data-hashelptext={showMenuHelpText}>
        <IconButton
          Icon={MenuIcon}
          onClick={openMenu}
          className="Menu--MenuButton"
          title="Open Menu"
          tabIndex={1}
        />
        <div className="Menu--HelpText">Click on a country to get started</div>
      </div>
      <Popup
        title={menuPopupTitle}
        modalIsOpen={menuIsOpen}
        setModalIsOpen={setMenuIsOpen}
      >
        <MenuPopupContent />
      </Popup>
    </Fragment>
  )
}
