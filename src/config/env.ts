export const getTmdbAccessToken = (): string =>
  import.meta.env.VITE_TMDB_ACCESS_TOKEN ?? ''
