import { NavLink } from "react-router-dom"
import { routes } from "@/app/providers/router/routes"
import styles from "./Header.module.css"
import logo from "@/assets/vector/logo.svg"

export function NavMenu() {
  return (
    <>
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
    </>
  )
}