import { z } from "zod";

export const zMovieListItem = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(""),
});

export const zMoviesListResponse = z.object({
  page: z.number(),
  results: z.array(zMovieListItem),
  total_pages: z.number().optional(),
  total_results: z.number().optional(),
});


export type MoviesListResponse = z.infer<typeof zMoviesListResponse>;

export const zGenresResponse = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});
export type GenresResponse = z.infer<typeof zGenresResponse>;

export const zMovieDetailsResponse = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional().default(""),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(""),
  runtime: z.number().nullable().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).optional().default([]),
});

export const zMovieCreditsResponse = z.object({
  id: z.number(),
  cast: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        character: z.string().optional().default(""),
        profile_path: z.string().nullable().optional(),
      })
    )
    .optional()
    .default([]),
});