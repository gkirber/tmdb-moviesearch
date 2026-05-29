import s from "./FiltersPanel.module.css";
import { useCallback, useState } from "react";
import { selectFilters } from "../model/selectors";
import { resetFilters, updateFilters } from "../model/filtersSlice";
import type { DiscoverParams, SortBy } from "@/entities/movie/model/types";
import { useDebouncedValue } from "@/widgets/filters-panel/lib/useDebouncedValue";
import { SortSelect } from "@/widgets/filters-panel/ui/SortSelect.tsx";
import { RatingRange } from "@/widgets/filters-panel/ui/RatingRange.tsx";
import { GenreMultiSelect } from "@/widgets/filters-panel/ui/GenreMultiSelect.tsx";
import { useAppDispatch, useAppSelector } from "@/app/providers/store/hooks.ts";

export function FiltersPanel() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const update = useCallback(
    (patch: Partial<DiscoverParams>) => dispatch(updateFilters(patch)),
    [dispatch]
  );

  const [ratingResetKey, setRatingResetKey] = useState(0);

  const reset = useCallback(() => {
    dispatch(resetFilters());
    setRatingResetKey((key) => key + 1);
  }, [dispatch]);

  const debouncedUpdateRating = useDebouncedValue((min: number, max: number) => {
    update({
      "vote_average.gte": min,
      "vote_average.lte": max,
      page: 1,
    });
  }, 200);

  const handleSortChange = (sort_by: SortBy) => update({ sort_by, page: 1 });
  const handleRatingChange = (min: number, max: number) => debouncedUpdateRating(min, max);

  return (
    <aside className={s.panel}>
      <h3 className={s.title}>Filter / Sort</h3>

      <SortSelect value={(filters.sort_by ?? "popularity.desc") as SortBy} onChange={handleSortChange} />

      <RatingRange
        key={ratingResetKey}
        minRating={filters["vote_average.gte"] ?? 0}
        maxRating={filters["vote_average.lte"] ?? 10}
        onRatingChange={handleRatingChange}
      />

      <section className={s.tags}>
        <GenreMultiSelect />
      </section>

      <button className={s.reset} onClick={reset}>
        Reset filters
      </button>
    </aside>
  );
}