import styles from "./SimilarMoviesBlock.module.css";
import type { MovieListItem } from "@/entities/movie/model/types.ts";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard.tsx";

type Props = {
  movies: MovieListItem[];
  loading?: boolean;
};

export function SimilarMoviesBlock({ movies, loading }: Props) {
  return (
    <section className={styles.block}>
      <h2 className={styles.title}>Similar Movies</h2>

      <div className={styles.grid}>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {!loading && movies.length === 0 && <div className={styles.empty}>No similar movies found.</div>}
    </section>
  );
}