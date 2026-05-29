import { useState } from 'react'
import { useCategoryMovies } from '@/shared/api/hooks/useCategoryMovies'
import { MovieSection } from '@/entities/movie/ui/MovieSection/MovieSection.tsx'
import { MainHero } from '@/widgets/main-hero/ui/MainHero.tsx'
import { getImageUrl } from '@/entities/movie/lib/imageUrl.ts'
import type { MovieListItem } from '@/entities/movie/model/types'

const pickRandomMovie = (movies: MovieListItem[]) =>
	movies[Math.floor(Math.random() * movies.length)]

function HeroWithRandomBackdrop({ movies }: { movies: MovieListItem[] }) {
	const [movie] = useState(() => pickRandomMovie(movies))

	const backdropUrl = movie.backdrop_path
		? getImageUrl(movie.backdrop_path, 'w780')
		: undefined

	return <MainHero backdropUrl={backdropUrl} />
}

export function MainPage() {
	const { data: popularData, isLoading: popularLoading } = useCategoryMovies(
		'popular',
		{ page: 1 },
	)
	const { data: topRatedData, isLoading: topRatedLoading } = useCategoryMovies(
		'top_rated',
		{ page: 1 },
	)
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useCategoryMovies('now_playing', { page: 1 })
	const { data: upcomingData, isLoading: upcomingLoading } = useCategoryMovies(
		'upcoming',
		{ page: 1 },
	)

	const sections = [
		{
			title: 'Popular Movies',
			movies: popularData?.results?.slice(0, 6) || [],
			category: 'popular',
		},
		{
			title: 'Top Rated Movies',
			movies: topRatedData?.results?.slice(0, 6) || [],
			category: 'top_rated',
		},
		{
			title: 'Upcoming Movies',
			movies: upcomingData?.results?.slice(0, 6) || [],
			category: 'upcoming',
		},
		{
			title: 'Now Playing Movies',
			movies: nowPlayingData?.results?.slice(0, 6) || [],
			category: 'now_playing',
		},
	] as const

	const isSectionLoading =
		popularLoading || topRatedLoading || nowPlayingLoading || upcomingLoading

	const popularMovies = popularData?.results

	return (
		<>
			{popularMovies?.length ? (
				<HeroWithRandomBackdrop movies={popularMovies} />
			) : (
				<MainHero />
			)}
			<section>
				{isSectionLoading
					? sections.map(section => (
							<div key={section.category} style={{ marginBottom: '32px' }}>
								<p style={{ opacity: 0.5 }}>{section.title}</p>
							</div>
						))
					: sections.map(section => (
							<MovieSection
								key={section.category}
								title={section.title}
								movies={section.movies}
								category={section.category}
							/>
						))}
			</section>
		</>
	)
}
