import s from "./GenreMultiSelect.module.css"
import { useGetGenresQuery } from "@/entities/movie/api/tmdbMovieApi"
import { selectFilters } from "@/features/filters/model/selectors"
import { updateFilters } from "@/features/filters/model/filtersSlice"
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch.ts"
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts"

export function GenreMultiSelect() {
  const { data: list } = useGetGenresQuery()

  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)

  const handleGenreClick = (genreId: number) => {
    const currentGenres = filters.with_genres ? filters.with_genres.split(",").map(Number) : []

    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId]

    dispatch(
      updateFilters({
        with_genres: newGenres.length > 0 ? newGenres.join(",") : undefined,
        page: 1,
      })
    )
  }

  return (
    <>
      {list?.genres.map((tag) => {
        const isSelected = filters.with_genres
          ? filters.with_genres.split(",").map(Number).includes(tag.id)
          : false

        return (
          <button
            type="button"
            className={`${s.tag} ${isSelected ? s.selected : ""}`}
            key={tag.id}
            onClick={() => handleGenreClick(tag.id)}
          >
            {tag.name}
          </button>
        )
      })}
    </>
  )
}
