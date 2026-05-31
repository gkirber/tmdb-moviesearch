import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { DiscoverParams, SortBy } from "@/entities/movie/model/types";

type FiltersState = DiscoverParams;

const initialState: FiltersState = {
  page: 1,
  sort_by: "popularity.desc" as SortBy,
  "vote_average.gte": 0,
  "vote_average.lte": 10,
  with_genres: undefined,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters(state, action: PayloadAction<Partial<DiscoverParams>>) {
      Object.assign(state, action.payload);
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;