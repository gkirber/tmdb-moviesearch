import s from "./GenreMultiSelect.module.css";
import { useGetGenresQuery } from "@/entities/movie/api/tmdbMovieApi";
import { selectFilters } from "../model/selectors";
import { updateFilters } from "../model/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/app/providers/store/hooks.ts";

export function GenreMultiSelect() {
  const { data: list } = useGetGenresQuery();

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleGenreClick = (genreId: number) => {
    const currentGenres = filters.with_genres ? filters.with_genres.split(",").map(Number) : [];

    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId];

    dispatch(
      updateFilters({
        with_genres: newGenres.length > 0 ? newGenres.join(",") : undefined,
        page: 1,
      })
    );
  };

  return (
    <>
      {list?.genres.map((tag) => {
        const isSelected = filters.with_genres
          ? filters.with_genres.split(",").map(Number).includes(tag.id)
          : false;

        return (
          <button
            type="button"
            className={`${s.tag} ${isSelected ? s.selected : ""}`}
            key={tag.id}
            onClick={() => handleGenreClick(tag.id)}
          >
            {tag.name}
          </button>
        );
      })}
    </>
  );
}