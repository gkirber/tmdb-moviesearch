import styles from './MainHero.module.css'
import { SearchForm } from '@/features/search-movie/ui/SearchForm.tsx'

type Props = {
	backdropUrl?: string
}

export function MainHero({ backdropUrl }: Props) {
	return (
		<section
			className={styles.hero}
			style={{
				backgroundImage: backdropUrl
					? `linear-gradient(
              180deg,
              rgba(4, 21, 45, 0) 0%,
              rgba(18, 18, 18, 0.95) 80%
            ),
            url(${backdropUrl})`
					: undefined,
			}}
		>
			<div className={styles.content}>
				<h1 className={styles.title}>Welcome</h1>
				<p className={styles.subtitle}>Browse highlighted titles from TMDB</p>

				<SearchForm />
			</div>
		</section>
	)
}
