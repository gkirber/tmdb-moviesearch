export type MovieListItem = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average: number;
  release_date: string;
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