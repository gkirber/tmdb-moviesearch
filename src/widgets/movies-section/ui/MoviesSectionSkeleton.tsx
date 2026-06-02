import styles from "./MoviesSectionSkeleton.module.css"

type Props = {
  count?: number;
  cardsPerRow?: number;
};

export function MoviesSectionSkeleton({ count = 4, cardsPerRow = 6 }: Props) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: count }).map((_, sectionIndex) => (
        <section key={sectionIndex} className={styles.section}>
          <header className={styles.header}>
            <div className={styles.title} />
            <div className={styles.button} />
          </header>

          <div className={styles.grid}>
            {Array.from({ length: cardsPerRow }).map((_, cardIndex) => (
              <div key={cardIndex} className={styles.card}>
                <div className={styles.poster} />
                <div className={styles.movieTitle} />
                <div className={styles.movieTitleSmall} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}