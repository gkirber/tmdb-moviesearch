import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SearchPage.module.css";
import { SearchForm } from "@/features/search-movie/ui/SearchForm";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard";
import { useGetSearchMoviesInfiniteQuery } from "@/entities/movie/api/tmdbMovieApi";
import {
  LinearProgress
} from "@/shared/ui/LinearProgress/LinearProgress.tsx";

function getQueryFromUrl(sp: URLSearchParams) {
  return (sp.get("query") ?? "").trim();
}

export function SearchPage() {
  const [sp, setSp] = useSearchParams();
  const query = getQueryFromUrl(sp);
  const skip = query.length === 0;

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSearchMoviesInfiniteQuery(
    { query, language: "en-US" },
    { skip }
  );

  const loading = isLoading || isFetching;
  const movies = (data?.pages ?? []).flatMap((p) => p.results);

  const onSearch = (value: string) => {
    const q = value.trim();
    const next = new URLSearchParams(sp);

    if (q) next.set("query", q);
    else next.delete("query");

    setSp(next, { replace: true });
  };

  const onClear = () => {
    const next = new URLSearchParams(sp);
    next.delete("query");
    setSp(next, { replace: true });
  };

  const noResults = !loading && !skip && movies.length === 0;

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Search</h1>
        {loading && <LinearProgress />}
        {isFetchingNextPage && (
          <div className={styles.loadingBar}>
            <LinearProgress />
          </div>
        )}
      </div>

      <SearchForm
        initialValue={query}
        disabled={loading}
        onSearch={onSearch}
        onClear={onClear}
      />

      {skip && (
        <p className={styles.hint}>Enter a movie title to start searching</p>
      )}

      {!skip && loading && movies.length === 0 && (
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton className={styles.skeletonPoster} />
              <Skeleton height={16} width="90%" borderRadius={8} />
              <Skeleton height={14} width="65%" borderRadius={8} />
            </div>
          ))}
        </div>
      )}

      {noResults && (
        <p className={styles.hint}>No matches found for "{query}"</p>
      )}


      {!skip && !noResults && movies.length > 0 && (
        <>
          <div className={styles.grid}>
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>

          <div className={styles.loadMoreRow}>
            <button
              className={styles.loadMore}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading..."
                : hasNextPage
                  ? "Load more"
                  : "No more results"}
            </button>
          </div>

          {isFetchingNextPage && (
            <div className={styles.loadMoreRow}>
              <div className={styles.loadingHint}>Loading more…</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
