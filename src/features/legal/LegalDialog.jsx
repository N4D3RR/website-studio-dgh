import { useEffect, useRef } from "react";
import LegalContent from "./LegalContent.jsx";
export default function LegalDialog({ kind, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  const cookies = kind === "cookie";
  return (
    <dialog
      ref={ref}
      className="legal-dialog"
      aria-labelledby="legal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Chiudi informativa"
      >
        ×
      </button>
      <LegalContent cookies={cookies} />
      <button className="dialog-done" onClick={onClose}>
        Torna al sito <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
