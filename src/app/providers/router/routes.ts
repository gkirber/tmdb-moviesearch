export const routes = {
  root: () => "/",
  category: (category: string) => `/category/${category}`,
  filtered: () => "/filtered",
  search: () => "/search",
  favorites: () => "/favorites",
  movie: (movieId: string) => `/movie/${movieId}`,
} as const
