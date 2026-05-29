import type { FavoriteMovie } from '@/features/favorites/model/favoritesSlice.ts';

export const FAVORITES_LS_KEY = "favorites";

export function loadFavorites(): FavoriteMovie[] {
  try {
    const raw = localStorage.getItem(FAVORITES_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoriteMovie[]) {
  localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));
}