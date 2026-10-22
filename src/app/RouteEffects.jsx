import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";
import { publication } from "@/data/site.js";
import { getRoute } from "./routes.js";
import { withBase } from "./paths.js";
export default function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const route = getRoute(pathname);
    document.title = route.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", route.description);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        publication.approved && route.indexable
          ? "index,follow"
          : "noindex,nofollow",
      );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (publication.approved && route.indexable) {
      const link = canonical ?? document.createElement("link");
      link.rel = "canonical";
      link.href = new URL(withBase(pathname), publication.siteUrl).href;
      if (!canonical) document.head.append(link);
    } else canonical?.remove();
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      if (hash) {
        try {
          document
            .getElementById(decodeURIComponent(hash.slice(1)))
            ?.scrollIntoView({ behavior: "instant" });
        } catch {
          /* Ignore malformed fragment identifiers. */
        }
      } else if (changedPage && navigationType !== "POP")
        window.scrollTo({ top: 0, behavior: "instant" });
      if (changedPage && !hash)
        document.getElementById("contenuto")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key, navigationType]);
  return null;
}
