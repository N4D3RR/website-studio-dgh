import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const preference = "(prefers-reduced-motion: reduce)";
const subscribe = (notify) => {
  const media = window.matchMedia(preference);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(preference).matches || !Element.prototype.animate;
const serverSnapshot = () => true;
const movements = {
  protesi: [{ transform: "translateY(-12px)" }, { transform: "translateY(0)" }],
  impianti: [{ transform: "translateY(-20px)" }, { transform: "translateY(0)" }],
  allineatori: [{ transform: "rotate(-3deg)" }, { transform: "rotate(3deg)" }],
  estetica: [{ transform: "scale(.94)" }, { transform: "scale(1.06)" }],
};

export function useIllustrationMotion(variant) {
  const ref = useRef(null);
  const [requested, setRequested] = useState(false);
  const disabled = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const playing = requested && !disabled;

  useEffect(() => {
    const figure = ref.current;
    const target = figure?.querySelector(".art-motion");
    if (!playing || !target || !movements[variant]) return undefined;
    const animation = target.animate(movements[variant], {
      duration: 2400,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out",
    });
    let visible = !window.IntersectionObserver;
    const update = () => {
      if (visible && !document.hidden) animation.play();
      else animation.pause();
    };
    update();
    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.15 });
    if (observer) observer.observe(figure);
    document.addEventListener("visibilitychange", update);
    return () => {
      animation.cancel();
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [playing, variant]);

  return { ref, playing, disabled, toggle: () => setRequested((value) => !value) };
}
