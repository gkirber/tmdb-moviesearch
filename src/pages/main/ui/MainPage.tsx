import { useMemo, useState } from "react";
import { useCategoryMovies } from "@/shared/api/hooks/useCategoryMovies";
import styles from "./MainPage.module.css";
import {MovieSection} from "@/widgets/movies-section/ui/MovieSection.tsx";
import {MainHero} from "@/widgets/main-hero/ui/MainHero.tsx";
import {getImageUrl} from "@/entities/movie/lib/imageUrl.ts";
import type { MovieListItem } from "@/entities/movie/model/types.ts";
import {
  MoviesSectionSkeleton
} from "@/widgets/movies-section/ui/MoviesSectionSkeleton.tsx";

type MainPageHeroProps = {
  movies: MovieListItem[];
};

const pickRandomHeroMovie = (movies: MovieListItem[]) => {
  const withBackdrop = movies.filter((movie) => movie.backdrop_path);
  const pool = withBackdrop.length ? withBackdrop : movies;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
};

const MainPageHero = ({ movies }: MainPageHeroProps) => {
  const [heroMovie] = useState(() => pickRandomHeroMovie(movies));

  const backdropUrl = heroMovie.backdrop_path
    ? getImageUrl(heroMovie.backdrop_path, "w780")
    : undefined;

  return <MainHero backdropUrl={backdropUrl} />;
};

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

  const heroMovies = useMemo(
    () => popularData?.results?.filter((movie) => movie.backdrop_path) ?? [],
    [popularData?.results],
  );

  return (
    <>
      {heroMovies.length > 0 ? (
        <MainPageHero key={heroMovies.map((movie) => movie.id).join("-")} movies={heroMovies} />
      ) : (
        <MainHero />
      )}

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
  );
}
