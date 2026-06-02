import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './CategoryMoviesPage.module.css'
import { useCategoryMovies } from '@/shared/lib/hooks/useCategoryMovies'
import type { Category } from '@/entities/movie/api/tmdbMovieApi'
import { MovieCard } from '@/entities/movie/ui/MovieCard/MovieCard'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'

const CATEGORY_TABS: Array<{ value: Category; label: string }> = [
	{ value: 'popular', label: 'Popular' },
	{ value: 'top_rated', label: 'Top Rated' },
	{ value: 'upcoming', label: 'Upcoming' },
	{ value: 'now_playing', label: 'Now Playing' },
]

function isCategory(value: string | undefined): value is Category {
	return (
		value === 'popular' ||
		value === 'top_rated' ||
		value === 'upcoming' ||
		value === 'now_playing'
	)
}

function getCategoryTitle(category: Category) {
	switch (category) {
		case 'popular':
			return 'Popular Movies'
		case 'top_rated':
			return 'Top Rated Movies'
		case 'upcoming':
			return 'Upcoming Movies'
		case 'now_playing':
			return 'Now Playing Movies'
	}
}

const clamp = (n: number, min: number, max: number) =>
	Math.max(min, Math.min(max, n))

export function CategoryMoviesPage() {
	const navigate = useNavigate()
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()

	const category: Category = isCategory(params.category)
		? params.category
		: 'popular'

	const rawPage = searchParams.get('page')
	const pageFromUrl = Number(rawPage ?? '1')
	const page = Number.isFinite(pageFromUrl)
		? clamp(Math.trunc(pageFromUrl), 1, 500)
		: 1

	const { data, isLoading, isFetching } = useCategoryMovies(category, { page })

	const totalPages = Math.min(data?.total_pages ?? 1, 500)
	const title = useMemo(() => getCategoryTitle(category), [category])

	const setPageInUrl = useCallback(
		(nextPage: number) => {
			const nextParams = new URLSearchParams(searchParams)
			nextParams.set('page', String(nextPage))
			setSearchParams(nextParams, { replace: true })
		},
		[searchParams, setSearchParams],
	)

	const handleChangeCategory = (next: Category) => {
		navigate(`/category/${next}?page=1`)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handlePrev = () => {
		const nextPage = clamp(page - 1, 1, totalPages)
		setPageInUrl(nextPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleNext = () => {
		const nextPage = clamp(page + 1, 1, totalPages)
		setPageInUrl(nextPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const loading = isLoading || isFetching

	useEffect(() => {
		if (rawPage == null) return
		const isInvalid =
			!Number.isFinite(pageFromUrl) || Math.trunc(pageFromUrl) !== page
		if (isInvalid) setPageInUrl(page)
	}, [rawPage, pageFromUrl, page, setPageInUrl])

	return (
		<div className={`container ${styles.page}`}>
			<div className={styles.tabs}>
				{CATEGORY_TABS.map(t => {
					const active = t.value === category
					return (
						<button
							key={t.value}
							type='button'
							className={`${styles.tab} ${active ? styles.active : ''}`}
							onClick={() => handleChangeCategory(t.value)}
						>
							{t.label}
						</button>
					)
				})}
			</div>

			<h1 className={styles.title}>{title}</h1>
			{loading && (
				<div className={styles.loadingBar}>
					<LinearProgress />
				</div>
			)}

			{!loading ? (
				<>
					<div className={styles.grid}>
						{(data?.results ?? []).map(movie => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>

					<div className={styles.pagination}>
						<button
							type='button'
							className={styles.pageBtn}
							onClick={handlePrev}
							disabled={page <= 1 || loading}
						>
							Prev
						</button>

						<div className={styles.pageInfo}>
							Page <b>{page}</b> / {totalPages}
						</div>

						<button
							type='button'
							className={styles.pageBtn}
							onClick={handleNext}
							disabled={page >= totalPages || loading}
						>
							Next
						</button>
					</div>
				</>
			) : (
				<div className={styles.grid}>
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className={styles.skeletonCard}>
							<Skeleton className={styles.skeletonPoster} />
							<Skeleton height={16} width='90%' borderRadius={8} />
							<Skeleton height={14} width='65%' borderRadius={8} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
