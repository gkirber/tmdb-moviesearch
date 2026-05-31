import type {MoviesCategoryParams} from "@/entities/movie/model/types.ts";
import {
  type Category,
  useGetCategoryMoviesQuery
} from "@/entities/movie/api/tmdbMovieApi.ts";


export const useCategoryMovies = (category: Category, params: MoviesCategoryParams) => {
  return useGetCategoryMoviesQuery({ category, params });
};