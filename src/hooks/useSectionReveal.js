import { useEffect } from "react";
import { useLocation } from "react-router";

// Il contenuto resta sempre leggibile: nessuna classe nascosta nell'HTML.
export function useSectionReveal(ref) {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = ref.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !main ||
      media.matches ||
      !window.IntersectionObserver ||
      !Element.prototype.animate
    )
      return undefined;

    const animations = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          // Non spostare una scheda già al centro dello schermo dopo un salto.
          if (entry.boundingClientRect.top < window.innerHeight * 0.35)
            continue;
          const panel = entry.target.firstElementChild;
          if (!panel) continue;
          const animation = panel.animate(
            [{ transform: "translateY(56px)" }, { transform: "translateY(0)" }],
            { duration: 750, easing: "cubic-bezier(.2,.75,.25,1)" },
          );
          animations.add(animation);
          animation.onfinish = animation.oncancel = () =>
            animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    for (const section of main.querySelectorAll(":scope > .section-frame")) {
      // L'apertura conserva la posizione dei contenuti già visibili.
      if (section.getBoundingClientRect().top >= window.innerHeight)
        observer.observe(section);
    }
    const stop = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const handlePreference = () => {
      if (media.matches) stop();
    };
    const handleFocus = (event) => {
      animations.forEach((animation) => {
        if (animation.effect?.target?.contains(event.target))
          animation.cancel();
      });
    };
    media.addEventListener("change", handlePreference);
    main.addEventListener("focusin", handleFocus);
    return () => {
      stop();
      media.removeEventListener("change", handlePreference);
      main.removeEventListener("focusin", handleFocus);
    };
  }, [ref, pathname]);
}
