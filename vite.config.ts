import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use the GitHub Pages base only for production builds outside Vercel.
  base: process.env.VERCEL ? "/" : mode === "production" ? "/tmdb-movie-search/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
}))