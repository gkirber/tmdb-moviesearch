import s from "./FavoritesPage.module.css";
import { MovieCard } from "@/entities/movie/ui/MovieCard/MovieCard";
import { useFavoritesMovies } from "@/shared/lib/hooks/useFavoritesMovies";

export function FavoritesPage() {
  const favorites = useFavoritesMovies();

  const moviesForCard = favorites.map((f) => ({
    id: f.id,
    title: f.title,
    poster_path: f.posterUrl,
    vote_average: f.voteAverage,
    release_date: "",
  }));

  return (
    <div className={`container ${s.page}`}>
      <h2 className={s.title}>Favorites</h2>

      {moviesForCard.length > 0 ? (
        <div className={s.grid}>
          {moviesForCard.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={s.empty}>Add movies to favorites to see them on this page.</div>
      )}
    </div>
  );
}
