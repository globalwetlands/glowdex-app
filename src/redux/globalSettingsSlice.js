import _ from 'lodash'

import { createSlice } from '@reduxjs/toolkit'

export const availableNumberClusters = [5, 18]

const initialState = {
  showMenuHelpText: true,
  numberOfClusters: 5,
  typologyBoxPlotQuantile: 0.8,
  enabledHabitats: ['mg', 'sm', 'sg'],
}

const globalSettingsSlice = createSlice({
  name: 'globalSettings',
  initialState,
  reducers: {
    hideMenuHelpText: (state) => {
      state.showMenuHelpText = false
    },
    setNumberOfClusters: (state, action) => {
      const number = action.payload
      if (availableNumberClusters.includes(number)) {
        state.numberOfClusters = number
      }
    },
    setTypologyBoxPlotQuantile: (state, action) => {
      state.typologyBoxPlotQuantile = action.payload
    },
    toggleEnabledHabitat: (state, action) => {
      const habitat = action.payload

      if (initialState.enabledHabitats.includes(habitat)) {
        state.enabledHabitats = _.xor(state.enabledHabitats, [habitat])
      }
    },
  },
})

export const {
  hideMenuHelpText,
  setNumberOfClusters,
  setTypologyBoxPlotQuantile,
  toggleEnabledHabitat,
} = globalSettingsSlice.actions

export default globalSettingsSlice.reducer
