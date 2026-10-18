/**
 * Server entry used ONLY by scripts/prerender.mjs at build time.
 * Renders each page to static HTML so visitors, search engines and assistive
 * technology get complete content before any JavaScript runs.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { allRoutes, notFoundRoute, getRouteMeta, type RouteMeta } from "./routes";
import { site } from "./data/site";
import { imageVariants } from "./config/media";

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

export { allRoutes, notFoundRoute, getRouteMeta, site, imageVariants };
export type { RouteMeta };
