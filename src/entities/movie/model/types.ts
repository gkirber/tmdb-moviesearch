export type MovieListItem = {
  id: number;
  title: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date: string;
};

export type MovieDetailsResponse = {
  id: number;
  title: string;

  overview: string;
  tagline?: string;

  poster_path?: string | null;
  backdrop_path?: string | null;

  release_date: string;
  runtime?: number | null;

  vote_average: number;
  vote_count?: number;

  genres: {
    id: number;
    name: string;
  }[];

  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];

  spoken_languages?: {
    iso_639_1: string;
    english_name: string;
    name: string;
  }[];
};


export type MoviesListResponse = {
  page: number;
  results: MovieListItem[];
  total_pages?: number;
  total_results?: number;
};


export type MoviesCategoryParams = {
  language?: string;
  page?: number;
  region?: string;
};

export type SortBy =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "title.asc"
  | "title.desc";

export type DiscoverParams = {
  page?: number;
  sort_by?: SortBy;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_genres?: string;
};

export type CastItem = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type MovieCreditsResponse = {
  id: number;
  cast: CastItem[];
};

export type SearchMoviesParams = {
  query: string;
  language?: string;
};