import { themeReducer, themeSlice } from '@/app/providers/theme/themeSlice.ts'
import {
	favoritesReducer,
	favoritesSlice,
} from '@/pages/favorites/model/favoritesSlice'
import { baseApi } from '@/shared/api/tmdb/baseApi.ts'
import { filtersReducer } from '@/widgets/filters-panel/model/filtersSlice.ts'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		[themeSlice.name]: themeReducer,
		filters: filtersReducer,
		[favoritesSlice.name]: favoritesReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-expect-error — expose store on window for dev debugging
window.store = store
