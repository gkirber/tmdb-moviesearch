import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  bootstrapped: boolean
}

const initialState: AppState = {
  bootstrapped: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const appReducer = appSlice.reducer
