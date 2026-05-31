import type { MovieListItem } from '@/entities/movie/model/types'
import { MoviePoster } from '@/entities/movie/ui/MoviePoster/MoviePoster'
import { RatingBadge } from '@/entities/movie/ui/RatingBadge/RatingBadge'
import { FavoriteButton } from '@/pages/favorites/ui/FavoriteButton'
import { useNavigate } from 'react-router-dom'
import styles from './MovieCard.module.css'

type Props = {
	movie: MovieListItem
}

export function MovieCard({ movie }: Props) {
	const navigate = useNavigate()

	const openDetails = () => {
		navigate(`/movie/${movie.id}`)
	}

	return (
		<article
			className={styles.card}
			onClick={openDetails}
			role='button'
			tabIndex={0}
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
