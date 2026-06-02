import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/app/providers/store/store"
import { loadFavorites, saveFavorites } from "../lib/favoritesStorage"

export type FavoriteMovie = {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
};

type FavoritesState = {
  items: FavoriteMovie[];
};

const initialState: FavoritesState = {
  items: loadFavorites(),
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const movie = action.payload
      const existingIndex = state.items.findIndex((item) => item.id === movie.id)

      if (existingIndex >= 0) state.items.splice(existingIndex, 1)
      else state.items.push(movie)

      saveFavorites(state.items)
    },
  },
})


export const selectFavorites = (state: RootState) =>
  state.favorites.items

export const selectIsFavorite = (movieId: number) => (state: RootState) =>
  state.favorites.items.some((m) => m.id === movieId)

export const { toggleFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer