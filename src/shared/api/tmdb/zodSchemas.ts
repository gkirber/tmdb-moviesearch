import { z } from "zod";

export const zMovieListItem = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(""),
});

export const zMoviesListResponse = z.object({
  page: z.number(),
  results: z.array(zMovieListItem),
  total_pages: z.number().optional(),
  total_results: z.number().optional(),
});