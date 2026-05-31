import styles from "./FilteredMoviesPage.module.css";
import { FiltersPanel } from "@/widgets/filters-panel/ui/FiltersPanel";
import { selectFilters } from "@/widgets/filters-panel/model/selectors";
import { useDiscoverMoviesQuery } from "@/entities/movie/api/tmdbMovieApi";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard";
import { useAppSelector } from "@/app/providers/store/hooks.ts";

export function FilteredMoviesPage() {
  const filters = useAppSelector(selectFilters);
  const { data, isFetching } = useDiscoverMoviesQuery(filters);

  return (
    <div className={`container ${styles.page}`}>
      <FiltersPanel />
      <section className={styles.content}>
        {isFetching && <div>Loading...</div>}
        <div className={styles.grid}>
          {(data?.results ?? []).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
