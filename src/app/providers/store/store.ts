import { configureStore } from "@reduxjs/toolkit";
import {baseApi} from "@/shared/api/tmdb/baseApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {filtersReducer} from "@/widgets/filters-panel/model/filtersSlice.ts";
import {
  favoritesReducer,
  favoritesSlice,

} from "@/features/favorites/model/favoritesSlice.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filters: filtersReducer,
    [favoritesSlice.name]: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-expect-error — expose store on window for dev debugging
window.store = store