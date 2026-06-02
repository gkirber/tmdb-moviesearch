import type {
  DiscoverParams, MovieCreditsResponse, MovieDetailsResponse,
  MoviesCategoryParams,
  MoviesListResponse, SearchMoviesParams
} from "../model/types"
import {baseApi} from "@/shared/api/tmdb/baseApi.ts"
import {
  type GenresResponse, zGenresResponse,
  zMovieCreditsResponse, zMovieDetailsResponse,
  zMoviesListResponse
} from "@/shared/api/tmdb/zodSchemas.ts"


function clampPage(page?: number) {
  if (!Number.isFinite(page)) return 1
  const int = Math.floor(page as number)
  if (int < 1) return 1
  if (int > 500) return 500
  return int
}

export const tmdbMovieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<MoviesListResponse, { category: Category; params?: MoviesCategoryParams }>({
      query: ({ category, params }) => {
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
    }),
    getMovieDetails: build.query<MovieDetailsResponse, { movieId: number; language?: string }>({
      query: ({ movieId, language = "en-US" }) => ({
        url: `/movie/${movieId}`,
        params: {language}
      }),
      transformResponse: (raw: unknown) => zMovieDetailsResponse.parse(raw),
      providesTags: (_res, _err, { movieId }) => [{ type: "Movies", id: movieId }],
    }),
    getSimilarMovies: build.query<MoviesListResponse, { movieId: number; page?: number; language?: string }>({
      query: ({ movieId, page = 1, language = "en-US" }) => ({
        url: `/movie/${movieId}/similar`,
        params: {
          language,
          page: clampPage(page),
        },
      }),
      transformResponse: (raw: unknown) => zMoviesListResponse.parse(raw),
      providesTags: (_res, _err, { movieId }) => [{ type: "Movies", id: `similar-${movieId}` }],
    }),
    getSearchMovies: build.infiniteQuery<MoviesListResponse, SearchMoviesParams, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const total = lastPage.total_pages ?? lastPage.page
          return lastPage.page < total ? lastPage.page + 1 : undefined
        },
      },

      query: ({ queryArg, pageParam = 1 }) => ({
        url: "/search/movie",
        params: {
          query: queryArg.query,
          page: pageParam,
          language: queryArg.language ?? "en-US",
          include_adult: false,
        },
      }),

      transformResponse: (raw: unknown) => zMoviesListResponse.parse(raw),

      providesTags: ["Search"],
    }),
    getMovieCredits: build.query<MovieCreditsResponse, { movieId: number; language?: string }>({
      query: ({ movieId, language = "en-US" }) => ({
        url: `/movie/${movieId}/credits`,
        params: { language },
      }),

      transformResponse: (raw: unknown) => zMovieCreditsResponse.parse(raw),

      providesTags: (_res, _err, { movieId }) => [
        { type: "Movies", id: `credits-${movieId}` },
      ],
    }),

  })
})

export const { useGetCategoryMoviesQuery, useDiscoverMoviesQuery, useGetGenresQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery, useGetMovieCreditsQuery, useGetSearchMoviesInfiniteQuery} = tmdbMovieApi

export type Category = "popular" | "top_rated" | "upcoming" | "now_playing";
