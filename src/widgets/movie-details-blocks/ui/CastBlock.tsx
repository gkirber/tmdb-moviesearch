import styles from "./CastBlock.module.css"
import { getImageUrl } from "@/entities/movie/lib/imageUrl.ts"
import type { CastItem } from "@/entities/movie/model/types.ts"

type Props = {
  cast: CastItem[];
  loading?: boolean;
}


const PROFILE_PLACEHOLDER = "https://placehold.co/185x278?text=No+Photo"

export function CastBlock({ cast, loading }: Props) {
  const top6 = (cast ?? []).slice(0, 6)

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>Cast</h2>

      <div className={styles.grid}>
        {top6.map((c) => {
          const photo = c.profile_path ? getImageUrl(c.profile_path, "w185") : PROFILE_PLACEHOLDER

          return (
            <div key={c.id} className={styles.card}>
              <img className={styles.photo} src={photo} alt={c.name} />
              <div className={styles.info}>
                <div className={styles.name}>{c.name}</div>
                <div className={styles.role}>{c.character || "—"}</div>
              </div>
            </div>
          )
        })}

        {!loading && top6.length === 0 && <div className={styles.empty}>No cast info.</div>}
      </div>
    </section>
  )
}