import { NavLink } from "react-router-dom";
import { routes } from "@/app/providers/router/router";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <NavLink to={routes.root()} className={styles.logo}>
          TMDB
        </NavLink>


        <nav className={styles.nav}>
          <NavLink to={routes.root()} end className={styles.link}>
            Main
          </NavLink>
          <NavLink to={routes.category("popular")} className={styles.link}>
            Category Movies
          </NavLink>
          <NavLink to={routes.filtered()} className={styles.link}>
            Filtered Movies
          </NavLink>
          <NavLink to={routes.search()} className={styles.link}>
            Search
          </NavLink>
          <NavLink to={routes.favorites()} className={styles.link}>
            Favorites
          </NavLink>
        </nav>


        <div className={styles.actions}>
          <button type="button" className={styles.themeBtn}>
            Toggle theme
          </button>
        </div>
      </div>
    </header>
  );
}