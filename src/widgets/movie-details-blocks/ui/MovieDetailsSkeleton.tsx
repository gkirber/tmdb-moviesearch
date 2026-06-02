import styles from './MovieDetailsSkeleton.module.css'

export function MovieDetailsSkeleton() {
	return (
		<div className={`container ${styles.page}`}>
			<div className={styles.topRow}>
				<div className={styles.back} aria-hidden="true" />
			</div>

			<section className={styles.hero}>
				<div className={styles.content}>
					<div className={styles.poster} aria-hidden="true" />

					<div className={styles.meta}>
						<div className={styles.titleRow}>
							<div className={styles.title} aria-hidden="true" />
							<div className={styles.rating} aria-hidden="true" />
						</div>

						<div className={styles.submeta} aria-hidden="true" />

						<div className={styles.overview}>
							<div className={styles.overviewLine} aria-hidden="true" />
							<div className={styles.overviewLine} aria-hidden="true" />
							<div className={styles.overviewLine} aria-hidden="true" />
							<div className={styles.overviewLineShort} aria-hidden="true" />
						</div>

						<div className={styles.genresTitle} aria-hidden="true" />
						<div className={styles.genres}>
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className={styles.genre} aria-hidden="true" />
							))}
						</div>
					</div>
				</div>
			</section>

			<section className={styles.block} aria-label="Loading cast">
				<div className={styles.blockTitle} aria-hidden="true" />
				<div className={styles.castGrid}>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className={styles.castItem}>
							<div className={styles.castPhoto} aria-hidden="true" />
							<div className={styles.castInfo}>
								<div className={styles.castName} aria-hidden="true" />
								<div className={styles.castRole} aria-hidden="true" />
							</div>
						</div>
					))}
				</div>
			</section>

			<section className={styles.block} aria-label="Loading similar movies">
				<div className={styles.blockTitle} aria-hidden="true" />
				<div className={styles.similarGrid}>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className={styles.similarCard}>
							<div className={styles.similarPoster} aria-hidden="true" />
							<div className={styles.similarTitle} aria-hidden="true" />
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
