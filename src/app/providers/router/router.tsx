import { routes } from '@/app/providers/router/router.ts'
import { CategoryMoviesPage } from '@/pages/category-movies/ui/CategoryMoviesPage.tsx'
import { FavoritesPage } from '@/pages/favorites/ui/FavoritesPage'
import { FilteredMoviesPage } from '@/pages/filtered-movies/ui/FilteredMoviesPage.tsx'
import { MainPage } from '@/pages/main/ui/MainPage.tsx'
import { MovieDetailsPage } from '@/pages/movie-details/ui/MovieDetailsPage.tsx'
import { SearchPage } from '@/pages/search/ui/SearchPage.tsx'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../../layouts/RootLayout/RootLayout'

export const router = createBrowserRouter([
	{
		path: routes.root(),
		element: <RootLayout />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: routes.category(':category'), element: <CategoryMoviesPage /> },
			{ path: routes.filtered(), element: <FilteredMoviesPage /> },
			{ path: routes.search(), element: <SearchPage /> },
			{ path: routes.favorites(), element: <FavoritesPage /> },
			{ path: routes.movie(':movieId'), element: <MovieDetailsPage /> },
		],
	},
])
