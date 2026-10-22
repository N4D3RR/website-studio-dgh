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
          // I salti a una sezione non devono spostare il contenuto già in lettura.
          if (entry.boundingClientRect.top < window.innerHeight * 0.35)
            continue;
          const panel = entry.target.firstElementChild;
          if (!panel || panel.contains(document.activeElement)) continue;
          const distance = window.innerWidth <= 700 ? 28 : 48;
          const animation = panel.animate(
            [
              { transform: `translateY(${distance}px)`, opacity: 0.15 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: 850, easing: "cubic-bezier(.2,.75,.25,1)" },
          );
          animations.add(animation);
          animation.onfinish = animation.oncancel = () =>
            animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    for (const section of main.querySelectorAll(":scope > .section-frame")) {
      // Anima anche le schede parzialmente visibili nella parte bassa.
      if (section.getBoundingClientRect().top >= window.innerHeight * 0.65)
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
