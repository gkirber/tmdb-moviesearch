import styles from "./MovieDetailsSkeleton.module.css"

export function MovieDetailsSkeleton() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.info}>
        <div className={styles.poster} />

        <div className={styles.meta}>
          <div className={styles.title} />
          <div className={styles.sub} />
          <div className={styles.sub} />

          <div className={styles.overview}>
            <div />
            <div />
            <div />
          </div>

          <div className={styles.genres}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.genre} />
            ))}
          </div>
        </div>
      </section>


      <section className={styles.block}>
        <div className={styles.blockTitle} />
        <div className={styles.castGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.castItem}>
              <div className={styles.castPhoto} />
              <div className={styles.castName} />
              <div className={styles.castRole} />
            </div>
          ))}
        </div>
      </section>


      <section className={styles.block}>
        <div className={styles.blockTitle} />
        <div className={styles.similarGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.similarPoster} />
          ))}
        </div>
      </section>
    </div>
  )
}