import type {
  DiscoverParams,
  MoviesCategoryParams,
  MoviesListResponse
} from "../model/types";
import {baseApi} from "@/shared/api/tmdb/baseApi.ts";
import {
  type GenresResponse, zGenresResponse,
  zMoviesListResponse
} from "@/shared/api/tmdb/zodSchemas.ts";


export const tmdbMovieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<MoviesListResponse, { category: Category; params?: MoviesCategoryParams }>({
      query: ({ category, params }: { category: Category; params: MoviesCategoryParams }) => {
        return {
          method: "get",
          url: `/movie/${category}`,
          params,
        }
      },
      transformResponse: (raw: unknown) => zMoviesListResponse.parse(raw),
      providesTags: (_result, _error, { category }) => [{ type: "Movies", id: `${category}` }],
    }),
    discoverMovies: build.query<MoviesListResponse, DiscoverParams>({
      query: (params) => ({
        url: "/discover/movie",
        params: {
          language: "en-US",
          include_adult: false,
          ...params,
        }
      }),
      transformResponse: (raw: unknown) => zMoviesListResponse.parse(raw),
      providesTags: ["Filters"],
    }),
    getGenres: build.query<GenresResponse, void>({
      query: () => ({
        url: "/genre/movie/list",
        params: {language: "en-US"}
      }),
      transformResponse: (raw: unknown) => zGenresResponse.parse(raw),
      providesTags: ["Genres"],
    })
  })
})

export const { useGetCategoryMoviesQuery, useDiscoverMoviesQuery, useGetGenresQuery } = tmdbMovieApi;

export type Category = "popular" | "top_rated" | "upcoming" | "now_playing";