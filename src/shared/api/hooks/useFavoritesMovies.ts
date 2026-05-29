import { selectFavorites } from "@/features/favorites/model/favoritesSlice";
import {useAppSelector} from "@/app/providers/store/hooks.ts";

export function useFavoritesMovies() {
  return useAppSelector(selectFavorites);
}
