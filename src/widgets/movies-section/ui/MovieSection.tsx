import { useNavigate } from "react-router-dom";
import styles from "./MovieSection.module.css";
import type { MovieListItem } from "@/entities/movie/model/types.ts";
import type { Category } from "@/entities/movie/api/tmdbMovieApi.ts";
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";


type Props = {
  title: string;
  movies: MovieListItem[];
  category: Category;
};

export function MovieSection({ title, movies, category }: Props) {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <button
          type="button"
          className={styles.viewMore}
          onClick={() => navigate(`/category/${category}`)}
        >
          View More
        </button>
      </header>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
