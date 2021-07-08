import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedGridItems: [],
}

const gridItemsSlice = createSlice({
  name: 'gridItems',
  initialState,
  reducers: {
    setSelectedGridItems: (state, action) => {
      state.selectedGridItems = action.payload
    },
  },
})

export const { setSelectedGridItems } = gridItemsSlice.actions

export default gridItemsSlice.reducer