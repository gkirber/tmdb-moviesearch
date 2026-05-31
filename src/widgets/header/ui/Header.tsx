import { NavLink } from "react-router-dom";
import { routes } from "@/app/providers/router/routes.ts";
import styles from "./Header.module.css";
import { selectThemeMode, toggleThemeMode } from "@/app/providers/theme/themeSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import logo from "@/assets/vector/logo.svg";

export function Header() {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to={routes.root()} className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
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
          <button
            type="button"
            className={styles.btnTheme}
            onClick={() => dispatch(toggleThemeMode())}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {themeMode === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
