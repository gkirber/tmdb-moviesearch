import { selectFavorites } from "@/pages/favorites/model/favoritesSlice";
import { useAppSelector } from "./useAppSelector";

export function useFavoritesMovies() {
  return useAppSelector(selectFavorites);
}
