import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CategoryMoviesPage.module.css";
import { useCategoryMovies } from "@/shared/api/hooks/useCategoryMovies";
import type { Category } from "@/entities/movie/api/tmdbMovieApi";
import type { MovieListItem } from "@/entities/movie/model/types";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard";

const CATEGORY_TABS: Array<{ value: Category; label: string }> = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
  { value: "now_playing", label: "Now Playing" },
];

function isCategory(value: string | undefined): value is Category {
  return value === "popular" || value === "top_rated" || value === "upcoming" || value === "now_playing";
}

function getCategoryTitle(category: Category) {
  switch (category) {
    case "popular":
      return "Popular Movies";
    case "top_rated":
      return "Top Rated Movies";
    case "upcoming":
      return "Upcoming Movies";
    case "now_playing":
      return "Now Playing Movies";
  }
}

export function CategoryMoviesPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // category из URL
  const category: Category = isCategory(params.category) ? params.category : "popular";

  // page из query ?page=1
  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const safePage = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const [page, setPage] = useState<number>(safePage);

  // держим page синхронно с URL если пользователь обновил/вставил ссылку
  if (page !== safePage) {
    // аккуратно: без бесконечного цикла — но это ок в данном простом кейсе
    // если хочешь строго — вынесем в useEffect
    setPage(safePage);
  }

  const { data, isLoading, isFetching } = useCategoryMovies(category, { page });

  const totalPages = data?.total_pages ?? 1;
  const movies: MovieListItem[] = data?.results ?? [];
  const title = useMemo(() => getCategoryTitle(category), [category]);

  const setPageInUrl = (nextPage: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(nextPage));
    setSearchParams(sp, { replace: true });
  };

  const handleChangeCategory = (next: Category) => {
    // при смене категории сбрасываем страницу на 1
    navigate(`/category/${next}?page=1`);
  };

  const handlePrev = () => {
    const next = Math.max(1, page - 1);
    setPage(next);
    setPageInUrl(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    const next = Math.min(totalPages, page + 1);
    setPage(next);
    setPageInUrl(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loading = isLoading || isFetching;

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        {CATEGORY_TABS.map((t) => {
          const active = t.value === category;
          return (
            <button
              key={t.value}
              type="button"
              className={`${styles.tab} ${active ? styles.active : ""}`}
              onClick={() => handleChangeCategory(t.value)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <h1 className={styles.title}>{title}</h1>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={handlePrev}
              disabled={page <= 1 || loading}
            >
              Prev
            </button>

            <div className={styles.pageInfo}>
              Page <b>{page}</b> / {totalPages}
            </div>

            <button
              type="button"
              className={styles.pageBtn}
              onClick={handleNext}
              disabled={page >= totalPages || loading}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}