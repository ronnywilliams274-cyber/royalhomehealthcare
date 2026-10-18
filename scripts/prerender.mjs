/**
 * Prerender every page to static HTML after `vite build`.
 *
 *   npm run build            (runs: tsc -b && vite build && node scripts/prerender.mjs)
 *   SITE_URL=https://www.example.com npm run build   (adds canonical URLs + sitemap.xml)
 *
 * Why: each URL (e.g. /services/wound-care) gets a real HTML file with its own
 * <title>, description and full content. That means fast first paint, better SEO,
 * correct page titles for screen readers, and content that works even if
 * JavaScript fails. The React app then "hydrates" the page in the browser.
 *
 * Uses esbuild, which is already installed as part of Vite.
 */
import { build } from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const outDir = path.join(root, "node_modules", ".cache", "rhhc-prerender");
const serverEntry = path.join(outDir, "entry-server.mjs");

if (!existsSync(path.join(dist, "index.html"))) {
  console.error("prerender: dist/index.html not found - run `vite build` first.");
  process.exit(1);
}

// 1) Bundle the server entry for Node.
await rm(outDir, { recursive: true, force: true });
await build({
  entryPoints: [path.join(root, "src", "entry-server.tsx")],
  outfile: serverEntry,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node18",
  // Keep React (and the router, which shares React's context) external so there is exactly one copy;
  // bundle everything else (icons, animation libraries) to avoid CommonJS/ESM quirks in Node.
  external: ["react", "react/*", "react-dom", "react-dom/*", "react-router", "three"],
  jsx: "automatic",
  loader: { ".css": "empty", ".svg": "empty", ".png": "empty", ".jpg": "empty" },
  logLevel: "warning",
  plugins: [
    {
      // Force packages that ship both CJS (main) and ESM (module) to resolve to ESM.
      // esbuild on platform:node picks `main` (CJS) by default; those CJS files
      // do `require("react")` at runtime which throws in an ESM Node context.
      name: "prefer-esm",
      setup(b) {
        const esmPackages = ["lucide-react"];
        b.onResolve({ filter: /.*/ }, async (args) => {
          if (!esmPackages.includes(args.path)) return undefined;
          const pkgDir = path.join(root, "node_modules", args.path);
          const pkg = JSON.parse(await readFile(path.join(pkgDir, "package.json"), "utf8"));
          const esm = pkg.module || pkg["jsnext:main"];
          if (!esm) return undefined;
          return { path: path.join(pkgDir, esm) };
        });
      },
    },
    {
      name: "alias-at",
      setup(b) {
        b.onResolve({ filter: /^@\// }, async (args) => {
          const r = await b.resolve("./" + args.path.slice(2), {
            resolveDir: path.join(root, "src"),
            kind: args.kind,
          });
          return r;
        });
      },
    },
  ],
});

const mod = await import(pathToFileURL(serverEntry).href);
const { render, allRoutes, notFoundRoute, site } = mod;

const siteUrl = (process.env.SITE_URL || site.siteUrl || "").replace(/\/+$/, "");
const template = await readFile(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function headTags(meta) {
  const tags = [];
  const url = siteUrl ? `${siteUrl}${meta.path === "/" ? "/" : meta.path}` : "";
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />');
  if (url && !meta.noindex) tags.push(`<link rel="canonical" href="${esc(url)}" />`);
  tags.push('<meta property="og:type" content="website" />');
  tags.push(`<meta property="og:site_name" content="${esc(site.name)}" />`);
  tags.push(`<meta property="og:title" content="${esc(meta.title)}" />`);
  tags.push(`<meta property="og:description" content="${esc(meta.description)}" />`);
  tags.push('<meta property="og:locale" content="en_US" />');
  if (url) tags.push(`<meta property="og:url" content="${esc(url)}" />`);
  if (siteUrl) tags.push(`<meta property="og:image" content="${esc(siteUrl)}/media/hero-poster-desktop.jpg" />`);
  tags.push('<meta name="twitter:card" content="summary_large_image" />');
  return tags.join("\n    ");
}

function page(meta, html) {
  // Function replacers so "$" characters in content are never treated as patterns.
  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, () => `<meta name="description" content="${esc(meta.description)}" />`)
    .replace("<!--app-head-->", () => headTags(meta));
  out = out.includes("<!--app-html-->")
    ? out.replace("<!--app-html-->", () => html)
    : out.replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${html}</div>`);
  return out;
}

async function write(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, "utf8");
}

let count = 0;
for (const meta of allRoutes) {
  const html = render(meta.path);
  const file = meta.path === "/" ? path.join(dist, "index.html") : path.join(dist, meta.path.slice(1), "index.html");
  await write(file, page(meta, html));
  count++;
}

// 404 page (served automatically by Netlify, Vercel, GitHub Pages, Cloudflare Pages)
await write(path.join(dist, "404.html"), page(notFoundRoute, render("/this-page-does-not-exist")));

// robots.txt + sitemap.xml
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = allRoutes
    .filter((r) => !r.noindex)
    .map((r) => `  <url><loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  await write(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  await write(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
} else {
  await write(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\n");
  console.warn("prerender: no SITE_URL set - skipped canonical URLs and sitemap.xml (set site.siteUrl in src/data/site.ts).");
}

await rm(outDir, { recursive: true, force: true });
console.log(`prerender: wrote ${count} pages + 404.html to dist/`);
