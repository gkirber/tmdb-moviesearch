import { useCategoryMovies } from "@/shared/lib/hooks/useCategoryMovies"
import styles from "./MainPage.module.css"
import {MovieSection} from "@/widgets/movies-section/ui/MovieSection.tsx"
import {MainHero} from "@/widgets/main-hero/ui/MainHero.tsx"
import {getImageUrl} from "@/entities/movie/lib/imageUrl.ts"
import {
  MoviesSectionSkeleton
} from "@/widgets/movies-section/ui/MoviesSectionSkeleton.tsx"



export function MainPage() {
  const { data: popularData, isLoading: popularLoading } = useCategoryMovies("popular", { page: 1 })
  const { data: topRatedData, isLoading: topRatedLoading } = useCategoryMovies("top_rated", { page: 1 })
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useCategoryMovies("now_playing", { page: 1 })
  const { data: upcomingData, isLoading: upcomingLoading } = useCategoryMovies("upcoming", { page: 1 })

  const sections = [
    { title: "Popular Movies", movies: popularData?.results?.slice(0, 6) || [], category: "popular" },
    { title: "Top Rated Movies", movies: topRatedData?.results?.slice(0, 6) || [], category: "top_rated" },
    { title: "Upcoming Movies", movies: upcomingData?.results?.slice(0, 6) || [], category: "upcoming" },
    { title: "Now Playing Movies", movies: nowPlayingData?.results?.slice(0, 6) || [], category: "now_playing" },
  ] as const

  const isSectionLoading =
    popularLoading ||
    topRatedLoading ||
    nowPlayingLoading ||
    upcomingLoading


  const results = popularData?.results ?? []
  const seed = results.reduce((acc, m) => acc + m.id, 0)
  const randomIndex = results.length > 0 ? seed % results.length : 0
  const randomMovie = results[randomIndex]

  const backdropUrl = randomMovie?.backdrop_path
    ? getImageUrl(randomMovie.backdrop_path, "original")
    : undefined

  return (
    <>
      <MainHero backdropUrl={backdropUrl} />

      <section className={`container ${styles.sections}`}>
        {isSectionLoading ? (
          <MoviesSectionSkeleton count={4} cardsPerRow={6} />
        ) : (
          sections.map((section) => (
            <MovieSection
              key={section.category}
              title={section.title}
              movies={section.movies}
              category={section.category}
            />
          ))
        )}
      </section>
    </>
  )
}