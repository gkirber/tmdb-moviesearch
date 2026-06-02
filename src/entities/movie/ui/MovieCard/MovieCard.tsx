import { useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"
import type { MovieListItem } from "@/entities/movie/model/types"
import { MoviePoster } from "@/entities/movie/ui/MoviePoster/MoviePoster"
import { RatingBadge } from "@/entities/movie/ui/RatingBadge/RatingBadge"
import { FavoriteButton } from "@/pages/favorites/ui/FavoriteButton"

type Props = {
  movie: MovieListItem;
};

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate()

  const openDetails = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openDetails()
    }
  }

  return (
    <article
      className={styles.card}
      onClick={openDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${movie.title}`}
    >
      <div className={styles.posterWrap}>
        <MoviePoster posterPath={movie.poster_path} title={movie.title} />

        <div className={styles.rating}>
          <RatingBadge value={movie.vote_average} />
        </div>

        <div className={styles.favorite}>
          <FavoriteButton movie={movie} />
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={movie.title}>
          {movie.title}
        </h3>
      </div>
    </article>
  )
}
