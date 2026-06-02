import { createSlice} from "@reduxjs/toolkit"
import type { RootState } from "@/app/providers/store/store"
import { loadTheme, saveTheme, type ThemeMode } from "./themeStorage"

type ThemeState = {
  themeMode: ThemeMode;
};

const initialState: ThemeState = {
  themeMode: loadTheme(),
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark"
      saveTheme(state.themeMode)
    },
  },
})

export const { toggleThemeMode } = themeSlice.actions
export const themeReducer = themeSlice.reducer


export const selectThemeMode = (state: RootState) => state.theme.themeMode