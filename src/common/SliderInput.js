import '@reach/slider/styles.css'

import { useState } from 'react'
import { useDebounce } from 'react-use'

import Slider from '@reach/slider'

import styles from './SliderInput.module.css'

export function SliderInput({ value, onChange, debounceMs = 0, ...props }) {
  const [val, setVal] = useState(value)

  // Debounce onChange handler
  useDebounce(
    () => {
      onChange(val)
    },
    debounceMs,
    [val]
  )

  return (
    <Slider
      className={styles.SliderInput}
      value={val}
      onChange={(value) => setVal(value)}
      {...props}
    />
  )
}
