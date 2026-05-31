import { useAppSelector } from '@/app/providers/store/hooks.ts'
import { selectFavorites } from '@/pages/favorites/model/favoritesSlice'

export function useFavoritesMovies() {
	return useAppSelector(selectFavorites)
}
