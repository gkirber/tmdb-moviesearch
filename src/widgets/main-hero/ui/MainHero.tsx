import styles from "./MainHero.module.css";


type Props = {
  backdropUrl?: string;
};

export function MainHero({ backdropUrl }: Props) {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
      }}
    >
      {/* затемняющий слой */}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Movie Explorer</h1>
        <p className={styles.subtitle}>Find your next favorite movie</p>

        {/*/!* 👇 feature поиска *!/*/}
        {/*<SearchForm />*/}
      </div>
    </section>
  );
}