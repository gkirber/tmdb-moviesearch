import { z } from "zod"

export const zMovieListItem = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(""),
})

export const zMoviesListResponse = z.object({
  page: z.number(),
  results: z.array(zMovieListItem),
  total_pages: z.number().optional(),
  total_results: z.number().optional(),
})


export type MoviesListResponse = z.infer<typeof zMoviesListResponse>;

export const zGenresResponse = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
})
export type GenresResponse = z.infer<typeof zGenresResponse>;


export const zMovieDetailsResponse = z.object({
  id: z.number(),
  title: z.string(),

  overview: z.string().optional().default(""),
  tagline: z.string().optional(),

  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),

  release_date: z.string().optional().default(""),
  runtime: z.number().nullable().optional(),

  vote_average: z.number().optional().default(0),
  vote_count: z.number().optional(),

  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional()
    .default([]),

  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    )
    .optional(),

  spoken_languages: z
    .array(
      z.object({
        iso_639_1: z.string(),
        english_name: z.string(),
        name: z.string(),
      })
    )
    .optional(),
})


export const zMovieCreditsResponse = z.object({
  id: z.number(),
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string().optional().default(""),
      profile_path: z.string().nullable().optional(),
    })
  ),
})