import { useNavigate } from 'react-router-dom'
import styles from './MovieCard.module.css'
import type { MovieListItem } from '@/entities/movie/model/types.ts'
import { MoviePoster } from '@/entities/movie/ui/MoviePoster/MoviePoster.tsx'
import { RatingBadge } from '@/entities/movie/ui/RatingBadge/RatingBadge.tsx'

type Props = {
	movie: MovieListItem
}

export function MovieCard({ movie }: Props) {
	const navigate = useNavigate()

	const handleOpenDetails = () => {
		navigate(`/movie/${movie.id}`)
	}

	return (
		<div className={styles.card}>
			<div className={styles.posterWrapper} onClick={handleOpenDetails}>
				<MoviePoster posterPath={movie.poster_path} title={movie.title} />

				<div className={styles.rating}>
					<RatingBadge value={movie.vote_average} />
				</div>
			</div>

			<div className={styles.info}>
				<h3
					className={styles.title}
					title={movie.title}
					onClick={handleOpenDetails}
				>
					{movie.title}
				</h3>
			</div>
		</div>
	)
}
