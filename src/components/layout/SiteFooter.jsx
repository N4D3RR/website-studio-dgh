import { withBase } from "@/app/paths.js";
import { Link, useLocation } from "react-router";
import { studio, publication } from "@/data/site.js";
import { getHomeHref } from "@/app/routes.js";

export default function SiteFooter({ onOpenLegal }) {
  const { pathname } = useLocation();
  const home = (hash) => getHomeHref(pathname, hash);
  const handleLegalClick = (event, kind) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    onOpenLegal(kind);
  };
  return (
    <footer className="site-footer section-shell">
      <div className="footer-identity">
        <img
          className="footer-mark"
          src={withBase("/brand/symbol-pink.svg")}
          alt=""
          width="62"
          height="70"
        />
        <p>
          {studio.name}
          {publication.approved && (
            <>
              <br />
              {publication.legalOwner} · P. IVA {publication.taxId}
            </>
          )}
          <br />
          Dott. {studio.professional.name} · {studio.professional.title}
          <br />
          Iscrizione Albo n. {studio.professional.registerNumber}
          {publication.approved && (
            <>
              {" · "}
              {publication.professionalOrder}
              <br />
              Titolo professionale rilasciato in:{" "}
              {publication.professionalTitleCountry}
              <br />
              <a
                href="https://portale.fnomceo.it/codice-deontologico/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Codice di deontologia medica (sito FNOMCeO)
              </a>
            </>
          )}
        </p>
      </div>
      <div className="footer-links">
        <Link
          to="/privacy.html"
          onClick={(event) => handleLegalClick(event, "privacy")}
        >
          Dati personali
        </Link>
        <Link
          to="/cookie.html"
          onClick={(event) => handleLegalClick(event, "cookie")}
        >
          Cookie e servizi esterni
        </Link>
        <Link to={home("#inizio")}>Torna all’inizio ↑</Link>
      </div>
      <p className="footer-note">
        Le informazioni del sito non sostituiscono la valutazione del
        professionista.
      </p>
    </footer>
  );
}
