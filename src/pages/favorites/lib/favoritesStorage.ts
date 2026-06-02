import type { FavoriteMovie } from "../model/favoritesSlice"

export const FAVORITES_LS_KEY = "favorites"

export function loadFavorites(): FavoriteMovie[] {
  try {
    const raw = localStorage.getItem(FAVORITES_LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => {
      if (item && typeof item === "object") {
        const posterPath =
          typeof item.posterPath === "string" || item.posterPath === null
            ? item.posterPath
            : typeof item.posterUrl === "string" || item.posterUrl === null
              ? item.posterUrl
              : null
        return { ...item, posterPath }
      }
      return item
    })
  } catch {
    return []
  }
}

export function saveFavorites(favorites: FavoriteMovie[]) {
  try {
    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites))
  } catch (err) {
    console.warn("Failed to save favorites.", err)
  }
}