import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks.ts'
import type { MovieListItem } from '@/entities/movie/model/types'
import {
	selectIsFavorite,
	toggleFavorite,
} from '@/pages/favorites/model/favoritesSlice'
import styles from './FavoriteButton.module.css'

type Props = {
	movie: MovieListItem
}

export function FavoriteButton({ movie }: Props) {
	const dispatch = useAppDispatch()
	const isFavorite = useAppSelector(selectIsFavorite(movie.id))

	const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		dispatch(
			toggleFavorite({
				id: movie.id,
				title: movie.title,
				posterUrl: movie.poster_path ?? null,
				voteAverage: movie.vote_average ?? 0,
			}),
		)
	}

	return (
		<button
			type='button'
			className={`${styles.button} ${isFavorite ? styles.active : ''}`}
			onClick={handleToggle}
			aria-label='Toggle favorite'
			title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			{isFavorite ? '❤️' : '🤍'}
		</button>
	)
}
