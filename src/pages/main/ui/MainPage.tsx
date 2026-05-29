import { useMemo } from "react";
import { useCategoryMovies } from "@/shared/api/hooks/useCategoryMovies";
import { MovieSection } from "@/widgets/movies-section/ui/MovieSection.tsx";
import { MoviesSectionSkeleton } from "@/widgets/movies-section/ui/MoviesSectionSkeleton.tsx";
import { MainHero } from "@/widgets/main-hero/ui/MainHero.tsx";
import { getImageUrl } from "@/entities/movie/lib/imageUrl.ts";


export function MainPage() {
  const { data: popularData, isLoading: popularLoading } = useCategoryMovies("popular", { page: 1 });
  const { data: topRatedData, isLoading: topRatedLoading } = useCategoryMovies("top_rated", { page: 1 });
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useCategoryMovies("now_playing", { page: 1 });
  const { data: upcomingData, isLoading: upcomingLoading } = useCategoryMovies("upcoming", { page: 1 });

  const sections = [
    { title: "Popular Movies", movies: popularData?.results?.slice(0, 6) || [], category: "popular" },
    { title: "Top Rated Movies", movies: topRatedData?.results?.slice(0, 6) || [], category: "top_rated" },
    { title: "Upcoming Movies", movies: upcomingData?.results?.slice(0, 6) || [], category: "upcoming" },
    { title: "Now Playing Movies", movies: nowPlayingData?.results?.slice(0, 6) || [], category: "now_playing" },
  ] as const;

  const isSectionLoading =
    popularLoading ||
    topRatedLoading ||
    nowPlayingLoading ||
    upcomingLoading;


  const heroMovie = useMemo(() => {
    const results = popularData?.results;
    if (!results?.length) return undefined;

    const index = results.reduce((acc, movie) => acc + movie.id, 0) % results.length;
    return results[index];
  }, [popularData]);

  const backdropUrl = heroMovie?.backdrop_path
    ? getImageUrl(heroMovie.backdrop_path, "w780")
    : undefined;

  return (
    <>
    <MainHero backdropUrl={backdropUrl} />
    <section>
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
  );
}