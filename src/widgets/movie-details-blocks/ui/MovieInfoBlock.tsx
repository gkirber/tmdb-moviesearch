import styles from "./MovieInfoBlock.module.css";
import { getImageUrl } from "@/entities/movie/lib/imageUrl.ts";
import { RatingBadge } from "@/entities/movie/ui/RatingBadge/RatingBadge.tsx";
import type {MovieDetailsResponse} from "@/entities/movie/model/types.ts";


const POSTER_PLACEHOLDER = "https://placehold.co/500x750?text=No+Poster";

function getYear(date?: string) {
  return date?.slice(0, 4) ?? "—";
}

function formatRuntime(runtime?: number | null) {
  if (!runtime || runtime <= 0) return "—";
  const h = Math.floor(runtime / 60);
  const m = runtime % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

type Props = {
  movie?: MovieDetailsResponse;
  loading?: boolean;
};

export function MovieInfoBlock({ movie, loading }: Props) {
  const posterUrl = movie?.poster_path ? getImageUrl(movie.poster_path, "w500") : POSTER_PLACEHOLDER;

  const backdropUrl = movie?.backdrop_path ? getImageUrl(movie.backdrop_path, "w1280") : undefined;

  return (
    <section className={styles.hero}>
      {backdropUrl && <div className={styles.backdrop} style={{ backgroundImage: `url(${backdropUrl})` }} />}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <img className={styles.poster} src={posterUrl} alt={movie?.title ?? "Poster"} />

        <div className={styles.meta}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{movie?.title ?? (loading ? "Loading..." : "—")}</h1>
            {movie?.vote_average != null && <RatingBadge value={movie.vote_average} />}
          </div>

          <div className={styles.submeta}>
            <span>Release year: {getYear(movie?.release_date)}</span>
            <span className={styles.dot}>•</span>
            <span>Runtime: {formatRuntime(movie?.runtime)}</span>
          </div>


          <p className={styles.overview}>
            {movie?.overview?.trim() ? movie.overview : loading ? "Loading description..." : "No description."}
          </p>

          <h3 className={styles.genresTitle}>Genres</h3>
          <div className={styles.genres}>
            {(movie?.genres ?? []).map((g) => (
              <span key={g.id} className={styles.genre}>
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}