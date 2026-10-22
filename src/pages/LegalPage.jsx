import { Link } from "react-router";
import LegalContent from "@/features/legal/LegalContent.jsx";
export default function LegalPage({ cookies = false }) {
  return (
    <main className="legal-page section-shell" id="contenuto" tabIndex={-1}>
      <LegalContent cookies={cookies} />
      <Link to="/">Torna al sito ↗</Link>
    </main>
  );
}
