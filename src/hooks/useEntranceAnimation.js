import { useEffect } from "react";
export function useEntranceAnimation(ref) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !ref.current) return undefined;
    const animations = Array.from(
      ref.current.querySelectorAll(".hero-enter"),
      (element, index) =>
        element.animate(
          [{ transform: "translateY(18px)" }, { transform: "translateY(0)" }],
          {
            duration: 800,
            delay: index * 70,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          },
        ),
    );
    const cancel = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener("change", cancel);
    return () => {
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", cancel);
    };
  }, [ref]);
}
