import { Link } from "react-router";
export default function NotFoundPage() {
  return (
    <main className="legal-page section-shell" id="contenuto" tabIndex={-1}>
      <p className="eyebrow">Errore 404</p>
      <h1>Pagina non trovata.</h1>
      <p>
        Puoi tornare alla home per consultare i percorsi e contattare lo studio.
      </p>
      <Link to="/">Torna al sito ↗</Link>
    </main>
  );
}
