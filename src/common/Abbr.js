import 'tippy.js/dist/tippy.css' // optional

import './InfoPopup'

import Tippy from '@tippyjs/react'

export function Abbr({ title, children }) {
  return (
    <Tippy content={title} interactive={true}>
      <abbr title={title}>{children}</abbr>
    </Tippy>
  )
}
