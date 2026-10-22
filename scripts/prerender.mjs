import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";

const publication = JSON.parse(
  await readFile("./content/publication.json", "utf8"),
);
if (
  publication.approved &&
  (!publication.privacyApproved ||
    !publication.legalOwner ||
    !/^\d{11}$/.test(publication.taxId) ||
    !publication.professionalOrder ||
    !publication.professionalTitleCountry ||
    !publication.privacyNotice ||
    !publication.hostingNotice ||
    !/^https:\/\//.test(publication.siteUrl))
) {
  throw new Error(
    "Completare i dati verificati (P. IVA di 11 cifre) e l’informativa prima di abilitare la pubblicazione.",
  );
}
const basePath = process.env.PUBLIC_BASE_PATH || "/";
const publicPath = (path) => `${basePath}${path.replace(/^\/+/, "")}`;
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { renderPage } = await server.ssrLoadModule("/src/entry-server.jsx");
  const { siteRoutes } = await server.ssrLoadModule("/src/app/routes.js");
  const template = await readFile("dist/index.html", "utf8");
  const publicRoutes = siteRoutes.filter(({ indexable }) => indexable);
  for (const route of siteRoutes) {
    let html = template.replace("<!--app-html-->", renderPage(route.path));
    html = html
      .replace(
        /<title>.*?<\/title>/s,
        `<title>${escapeHtml(route.title)}</title>`,
      )
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/s,
        `$1${escapeHtml(route.description)}$2`,
      );
    if (publication.approved && route.indexable) {
      html = html.replace("noindex,nofollow", "index,follow");
      html = html.replace(
        "</head>",
        `<link rel="canonical" href="${escapeHtml(new URL(publicPath(route.path), publication.siteUrl).href)}" /></head>`,
      );
    }
    await writeFile(
      route.path === "/" ? "dist/index.html" : `dist${route.path}`,
      html,
    );
  }
  await writeFile(
    "dist/invisalign.html",
    `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=${escapeHtml(publicPath("allineatori.html"))}"><title>Allineatori trasparenti | Studio Deghaili</title></head><body><p><a href="${escapeHtml(publicPath("allineatori.html"))}">Informazioni sugli allineatori trasparenti</a></p></body></html>`,
  );
  await writeFile("dist/.nojekyll", "");
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\n${publication.approved ? `Allow: /\nSitemap: ${new URL(publicPath("sitemap.xml"), publication.siteUrl).href}` : "Allow: /"}\n`,
  );
  if (publication.approved)
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(({ path }) => `<url><loc>${escapeHtml(new URL(publicPath(path), publication.siteUrl).href)}</loc></url>`).join("")}</urlset>`,
    );
  console.log(
    `${siteRoutes.length} pagine prerenderizzate dalle route; indicizzazione: ${publication.approved ? "abilitata" : "disabilitata in bozza"}`,
  );
} finally {
  await server.close();
}
