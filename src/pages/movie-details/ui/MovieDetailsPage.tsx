import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./MovieDetailsPage.module.css"

import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from "@/entities/movie/api/tmdbMovieApi"

import { MovieInfoBlock } from "@/widgets/movie-details-blocks/ui/MovieInfoBlock"
import { CastBlock } from "@/widgets/movie-details-blocks/ui/CastBlock.tsx"
import { SimilarMoviesBlock } from "@/widgets/movie-details-blocks/ui/SimilarMoviesBlock"
import {
  MovieDetailsSkeleton
} from "@/widgets/movie-details-blocks/ui/MovieDetailsSkeleton.tsx"


export function MovieDetailsPage() {
  const navigate = useNavigate()
  const { movieId } = useParams()

  const id = useMemo(() => Number(movieId), [movieId])
  const skip = !Number.isFinite(id) || id <= 0

  const { data: movie, isLoading: dL, isFetching: dF, error } = useGetMovieDetailsQuery(
    { movieId: id },
    { skip }
  )

  const { data: credits, isLoading: cL, isFetching: cF } = useGetMovieCreditsQuery(
    { movieId: id },
    { skip }
  )

  const { data: similar, isLoading: sL, isFetching: sF } = useGetSimilarMoviesQuery(
    { movieId: id, page: 1 },
    { skip }
  )

  const loading = dL || dF || cL || cF || sL || sF

  if (skip) {
    return (
      <div className={`container ${styles.page}`}>
        <button className={styles.back} type="button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles.error}>Invalid movie id</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`container ${styles.page}`}>
        <button className={styles.back} type="button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles.error}>Failed to load movie details.</div>
      </div>
    )
  }


  if (loading) return <MovieDetailsSkeleton />

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.topRow}>
        <button className={styles.back} type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>


      <MovieInfoBlock movie={movie} loading={loading} />

      <CastBlock cast={credits?.cast ?? []} loading={loading} />

      <SimilarMoviesBlock movies={(similar?.results ?? []).slice(0, 6)} loading={loading} />
    </div>

  )
}
