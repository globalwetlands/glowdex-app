import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showMenuHelpText: true,
  numberOfClusters: 5,
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
  },
})

export const { hideMenuHelpText, setNumberOfClusters } =
  globalSettingsSlice.actions

export default globalSettingsSlice.reducer
