import { useEffect, useState } from "react";
import { useLocation } from "react-router";
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);
  useEffect(() => {
    if (!isOpen) return undefined;
    const close = (event) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      document.getElementById("menu-toggle")?.focus();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isOpen]);
  return {
    isOpen,
    toggle: () => setIsOpen((open) => !open),
    close: () => setIsOpen(false),
  };
}
