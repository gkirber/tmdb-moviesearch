# TMDB Movie Search

A modern single-page application for browsing, searching, and filtering movies using [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Save favorites locally, explore categories, and view rich movie details with cast and recommendations.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E63DD?style=for-the-badge&logo=zod&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![TMDB API](https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Deployment](#deployment)
- [Data Attribution](#data-attribution)
- [License](#license)

---

## Features

### Home

- Hero section with a dynamic backdrop from popular movies
- Curated rows: **Popular**, **Top Rated**, **Upcoming**, and **Now Playing**
- Skeleton loaders while data is fetching

### Category Movies

- Browse movies by category: `popular`, `top_rated`, `upcoming`, `now_playing`
- Tab navigation between categories
- Paginated results with URL-synced page state

### Filtered Movies

- Discover movies via TMDB `/discover/movie` endpoint
- **Sort** by popularity, rating, release date, and more
- **Rating range** filter with debounced updates
- **Multi-select genres** loaded from TMDB genre list
- Reset filters to defaults

### Search

- Search movies by title with debounced input
- Paginated search results

### Movie Details

- Full movie information (overview, runtime, genres, rating, poster/backdrop)
- **Cast** section with actor cards
- **Similar movies** recommendations
- Favorite toggle on detail and list views

### Favorites

- Add or remove movies from favorites
- Persisted in **localStorage** across sessions
- Dedicated favorites page

### UX & Quality

- **Light / dark theme** with preference saved to localStorage
- Global error handling with **toast notifications**
- **Zod** runtime validation of API responses
- **RTK Query** caching, refetch on focus/reconnect, and tagged invalidation
- Responsive layout with CSS Modules
- 404 page for unknown routes

---

## Tech Stack

| Category | Technology |
| --- | --- |
| UI | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 7](https://vite.dev/) |
| State & data | [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Validation | [Zod 4](https://zod.dev/) |
| Notifications | [react-toastify](https://fkhadra.github.io/react-toastify/introduction) |
| Loading UI | [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) |
| Styling | CSS Modules + CSS variables |
| Linting | [ESLint 9](https://eslint.org/) |
| Package manager | [pnpm](https://pnpm.io/) |
| External API | [TMDB API v3](https://developer.themoviedb.org/docs) |

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" height="40" alt="Vite" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40" height="40" alt="Redux" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" width="40" height="40" alt="React Router" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="40" height="40" alt="ESLint" />
</p>

---

## Architecture

The project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** principles:

```text
src/
├── app/          # App shell: providers, router, store, global styles, layouts
├── pages/        # Route-level screens (main, search, favorites, movie details, …)
├── widgets/      # Composite UI blocks (header, footer, movie sections, details blocks)
├── features/     # User actions (filters, search form, theme toggle)
├── entities/     # Business entities (movie, person) — API, types, UI cards
└── shared/       # Reusable UI kit, API base, hooks, utilities
```

**Data flow highlights:**

- `baseApi` (RTK Query) centralizes TMDB HTTP requests with Bearer auth
- `tmdbMovieApi` injects movie-related endpoints with Zod `transformResponse` parsing
- Redux slices manage **filters**, **favorites**, and **theme**
- Path alias `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig`)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- [pnpm](https://pnpm.io/installation) 9+
- A TMDB account and **API Read Access Token (v4)**

### 1. Clone the repository

```bash
git clone https://github.com/gkirber/tmdb-moviesearch.git
cd tmdb-moviesearch
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Copy the example env file and add your TMDB token:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) below.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

Create a `.env` file in the project root:

| Variable               | Required | Description                                                                       |
| ---------------------- | -------- | --------------------------------------------------------------------------------- |
| `VITE_TMDB_AUTH_TOKEN` | Yes      | TMDB **v4** Read Access Token (sent as `Authorization: Bearer …`)                 |
| `TMDB_BASE_URL`        | No       | Documented in `.env.example`; the app uses `https://api.themoviedb.org/3` in code |

**How to get a TMDB token:**

1. Register at [themoviedb.org](https://www.themoviedb.org/signup)
2. Open [API Settings](https://www.themoviedb.org/settings/api)
3. Create an API key and copy the **API Read Access Token**

> Never commit `.env` or expose your token in client-side public repos if the app is deployed without additional proxying. For production, consider a backend proxy for API keys.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check (`tsc -b`) and production build |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Run ESLint across the project |

---

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero + movie sections |
| `/category/:category` | Category listing (`popular`, `top_rated`, `upcoming`, `now_playing`) |
| `/filtered` | Discover movies with filters |
| `/search` | Movie search |
| `/favorites` | Saved favorites |
| `/movie/:movieId` | Movie details, cast, similar titles |
| `*` | 404 Not Found |

---

## Deployment

Build the app with `pnpm build`. The output is in `dist/`. Serve locally with `pnpm preview`, or deploy the `dist` folder to any static host.

### Vercel

1. Import the repository on [vercel.com](https://vercel.com) (Vite is detected automatically).
2. **Required:** open **Project Settings → Environment Variables** and add the TMDB token you received during registration:
   - **Name:** `VITE_TMDB_AUTH_TOKEN`
   - **Value:** your TMDB **v4 Read Access Token** (from [API Settings](https://www.themoviedb.org/settings/api))
   - **Environments:** Production (and Preview if you use PR deployments)
3. Redeploy after adding the variable — Vite embeds `VITE_*` values at build time, so the app will not call TMDB without it.
4. The repo includes `vercel.json` with SPA rewrites so client-side routes work on refresh.

> **Note:** `VITE_` variables are included in the client bundle. For a public production app, consider a backend proxy instead of exposing the token.

---

## Data Attribution

This product uses the TMDB API but is **not endorsed or certified by TMDB**.

> © MovieSearch Demo · Data courtesy of [TMDB](https://www.themoviedb.org/).

---

## License

This project is for educational and demonstration purposes. Check the repository license file if present; TMDB data and imagery are subject to [TMDB terms of use](https://www.themoviedb.org/documentation/api/terms-of-use).
