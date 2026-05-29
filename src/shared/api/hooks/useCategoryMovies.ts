import {
	useGetCategoryMoviesQuery,
	type Category,
} from '@/entities/movie/api/tmdbMovieApi.ts'
import type { MoviesCategoryParams } from '@/entities/movie/model/types.ts'

export type { Category }

export const useCategoryMovies = (
	category: Category,
	params: MoviesCategoryParams = {},
) =>
	useGetCategoryMoviesQuery({
		category,
		params,
	})
