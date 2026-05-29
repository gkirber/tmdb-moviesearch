const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type ImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original";


export function getImageUrl(
  path: string,
  size: ImageSize = "w342"
): string {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}