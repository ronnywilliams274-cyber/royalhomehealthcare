import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// base is "/" because the site has real page URLs (/services/wound-care/ etc.).
// `npm run build` builds the app, then scripts/prerender.mjs writes a static,
// fully-rendered HTML file for every page (fast, SEO-friendly, works without JS).
export default defineConfig(({ command }) => ({
  base: '/',
  // The inspector plugin is a development aid only; keep it out of production HTML.
  plugins: command === 'serve' ? [inspectAttr(), react()] : [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
