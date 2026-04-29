import { Typography } from '@mui/material'
import { getTmdbAccessToken } from '../../config/env'
import styles from './MainPage.module.css'

export const MainPage = () => {
  const hasToken = Boolean(getTmdbAccessToken().trim())

  return (
    <main className={styles.root}>
      <Typography component="h1" variant="h4" gutterBottom>
        Kinopoisk Demo
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Project scaffold is ready. Next: wire up the TMDB API, routes, and the rest
        of the specification.
      </Typography>
      <Typography
        className={styles.tokenHint}
        color={hasToken ? 'success.main' : 'warning.main'}
        variant="body2"
        sx={{ mt: 2 }}
      >
        {hasToken
          ? 'TMDB token found in environment variables.'
          : 'Add VITE_TMDB_ACCESS_TOKEN to your .env file (see .env.example).'}
      </Typography>
    </main>
  )
}
