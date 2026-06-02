import { selectFavorites } from "@/pages/favorites/model/favoritesSlice.ts"
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts"

export function useFavoritesMovies() {
  return useAppSelector(selectFavorites)
}
