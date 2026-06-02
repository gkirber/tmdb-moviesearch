import styles from "./FavoriteButton.module.css"
import { toggleFavorite, selectIsFavorite } from "@/pages/favorites/model/favoritesSlice"
import type { MouseEvent } from "react"
import type { MovieListItem } from "@/entities/movie/model/types"
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts"
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch.ts"

type Props = {
  movie: MovieListItem;
};

export function FavoriteButton({ movie }: Props) {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(selectIsFavorite(movie.id))

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path ?? null,
        voteAverage: movie.vote_average ?? 0,
      })
    )
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${isFavorite ? styles.active : ""}`}
      onClick={handleToggle}
      aria-label="Toggle favorite"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  )
}