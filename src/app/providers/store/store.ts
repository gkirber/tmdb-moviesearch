import { configureStore } from "@reduxjs/toolkit";
import {baseApi} from "@/shared/api/tmdb/baseApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import { filtersReducer } from "@/widgets/filters-panel/model/filtersSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-expect-error — debug helper in dev
window.store = store