import { configureStore } from "@reduxjs/toolkit";
import {baseApi} from "@/shared/api/tmdb/baseApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import { filtersReducer } from "@/features/filters/model/filtersSlice";
import {
  favoritesReducer,
  favoritesSlice,
} from "@/pages/favorites/model/favoritesSlice";
import {themeReducer, themeSlice} from "@/app/providers/theme/themeSlice.ts";

export const store = configureStore({
  reducer: {
    [themeSlice.name]: themeReducer,
    filters: filtersReducer,
    [favoritesSlice.name]: favoritesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-expect-error - expose store for debugging in the browser
window.store = store