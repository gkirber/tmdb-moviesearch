import styles from "./MoviePoster.module.css"
import {getImageUrl} from "@/entities/movie/lib/imageUrl.ts"


type Props = {
  posterPath: string | null |undefined;
  title: string;
};

export function MoviePoster({ posterPath, title }: Props) {
  const src = posterPath
    ? getImageUrl(posterPath, "w342")
    : "https://placehold.co/342x513?text=No+Image"

  return (
    <img
      className={styles.poster}
      src={src}
      alt={title}
      loading="lazy"
    />
  )
}
