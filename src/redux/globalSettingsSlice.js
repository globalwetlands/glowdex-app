import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showMenuHelpText: true,
  numberOfClusters: 5,
  typologyBoxPlotQuantile: 0.8,
}

const globalSettingsSlice = createSlice({
  name: 'globalSettings',
  initialState,
  reducers: {
    hideMenuHelpText: (state) => {
      state.showMenuHelpText = false
    },
    setNumberOfClusters: (state, action) => {
      state.numberOfClusters = action.payload
    },
    setTypologyBoxPlotQuantile: (state, action) => {
      state.typologyBoxPlotQuantile = action.payload
    },
  },
})

export const {
  hideMenuHelpText,
  setNumberOfClusters,
  setTypologyBoxPlotQuantile,
} = globalSettingsSlice.actions

export default globalSettingsSlice.reducer
