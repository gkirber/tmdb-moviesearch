import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/providers/store/store";
import { loadFavorites, saveFavorites } from "../lib/favoritesStorage";

export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string | null;
  voteAverage: number;
};

type FavoritesState = {
  items: FavoriteMovie[];
};

const initialState: FavoritesState = {
  items: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const m = action.payload;
      const idx = state.items.findIndex((x) => x.id === m.id);

      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(m);

      saveFavorites(state.items);
    },
  },
});


export const selectFavorites = (state: RootState) =>
  state.favorites.items;

export const selectIsFavorite = (movieId: number) => (state: RootState) =>
  state.favorites.items.some((m) => m.id === movieId);

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;