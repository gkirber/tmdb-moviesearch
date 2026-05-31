import styles from "./FilteredMoviesPage.module.css";
import { FiltersPanel } from "@/features/filters/ui/FiltersPanel";
import { selectFilters } from "@/features/filters/model/selectors";
import { useDiscoverMoviesQuery } from "@/entities/movie/api/tmdbMovieApi";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  LinearProgress
} from "@/shared/ui/LinearProgress/LinearProgress";

export function FilteredMoviesPage() {
  const filters = useAppSelector(selectFilters);
  const { data, isFetching } = useDiscoverMoviesQuery(filters);
  const loading = isFetching;

  return (
    <div className={`container ${styles.page}`}>
      <FiltersPanel />
      <section className={styles.content}>
        {loading && (
          <div className={styles.loadingBar}>
            <LinearProgress />
          </div>
        )}
        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <Skeleton className={styles.skeletonPoster} />
                <Skeleton height={16} width="90%" borderRadius={8} />
                <Skeleton height={14} width="65%" borderRadius={8} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {(data?.results ?? []).map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
