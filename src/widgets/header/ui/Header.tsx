import { NavLink } from "react-router-dom";
import {routes} from "@/app/providers/router/router.ts";

export function Header() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: "8px 10px",
    textDecoration: "none",
    borderBottom: isActive ? "2px solid currentColor" : "2px solid transparent",
  });

  return (
    <header style={{ display: "flex", gap: 16, alignItems: "center", padding: 16 }}>
      <NavLink to={routes.root()} style={{ fontWeight: 800, textDecoration: "none" }}>
        TMDB
      </NavLink>

      <nav style={{ display: "flex", gap: 8 }}>
        <NavLink to={routes.root()} style={linkStyle} end>Main</NavLink>
        <NavLink to={routes.category("popular")} style={linkStyle}>Category Movies</NavLink>
        <NavLink to={routes.filtered()} style={linkStyle}>Filtered Movies</NavLink>
        <NavLink to={routes.search()} style={linkStyle}>Search</NavLink>
        <NavLink to={routes.favorites()} style={linkStyle}>Favorites</NavLink>
      </nav>

      <div style={{ marginLeft: "auto" }}>
        <button type="button">Toggle theme</button>
      </div>
    </header>
  );
}