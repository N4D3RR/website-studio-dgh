import { useEffect } from "react";
import { useLocation } from "react-router";

const DURATION = 1100;
const easeInOut = (t) => t * t * (3 - 2 * t);

export function useSmoothCardScroll(ref) {
  const { pathname } = useLocation();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;
    let moving = false;
    let lastWheel = -Infinity;
    let finished = false;
    const cancel = () => {
      cancelAnimationFrame(frame);
      moving = false;
      finished = false;
      root.classList.remove("is-card-scrolling");
    };
    const onWheel = (event) => {
      if (
        media.matches ||
        event.ctrlKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      )
        return;
      if (document.querySelector("dialog[open]") || !ref.current) return;
      const now = performance.now();
      const previousWheel = lastWheel;
      lastWheel = now;
      // Una raffica di eventi del trackpad corrisponde a una sola pagina.
      if (moving || (finished && now - previousWheel < 180)) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < 4) return;
      const viewport = window.innerHeight;
      const y = window.scrollY;
      const cards = Array.from(
        ref.current.querySelectorAll(":scope > .section-frame"),
      );
      // Nelle schede più lunghe si conserva lo scorrimento del contenuto.
      const insideLongCard = cards.some((card) => {
        const rect = card.getBoundingClientRect();
        return (
          rect.height > viewport + 2 &&
          (event.deltaY > 0
            ? rect.bottom > viewport + 2 && rect.top <= 2
            : rect.top < -2 && rect.bottom >= viewport - 2)
        );
      });
      if (insideLongCard) return;
      const max = Math.max(0, root.scrollHeight - viewport);
      const stops = [
        0,
        ...cards.flatMap((card) => {
          const rect = card.getBoundingClientRect();
          const clamp = (position) => Math.max(0, Math.min(max, position));
          if (rect.height > viewport + 2)
            return [clamp(y + rect.top), clamp(y + rect.bottom - viewport)];
          return [clamp(y + rect.top + (rect.height - viewport) / 2)];
        }),
        max,
      ].sort((a, b) => a - b);
      const target =
        event.deltaY > 0
          ? stops.find((stop) => stop > y + 3)
          : stops.findLast((stop) => stop < y - 3);
      if (target === undefined) return;
      event.preventDefault();
      moving = true;
      finished = false;
      root.classList.add("is-card-scrolling");
      const started = performance.now();
      const tick = (time) => {
        const progress = Math.min(1, (time - started) / DURATION);
        window.scrollTo({
          top: y + (target - y) * easeInOut(progress),
          behavior: "instant",
        });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else {
          moving = false;
          finished = true;
          root.classList.remove("is-card-scrolling");
        }
      };
      frame = requestAnimationFrame(tick);
    };
    const onPreference = () => {
      if (media.matches) cancel();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    media.addEventListener("change", onPreference);
    return () => {
      cancel();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
      media.removeEventListener("change", onPreference);
    };
  }, [ref, pathname]);
}
