import type { MoviesCategoryParams, MoviesListResponse } from "../model/types";
import {baseApi} from "@/shared/api/tmdb/baseApi.ts";


export const tmdbMovieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<
      MoviesListResponse,
      { category: Category; params: MoviesCategoryParams }
    >({
      query: ({ category, params }) => {
        return {
          method: "get",
          url: `movie/${category}`,
          params,
        }
      },
      providesTags: (_result, _error, { category }) => [{ type: "Movies", id: `${category}` }],
    }),
  })
})

export const { useGetCategoryMoviesQuery } = tmdbMovieApi;

export type Category = "popular" | "top_rated" | "upcoming" | "now_playing";