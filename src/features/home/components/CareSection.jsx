import { withBase } from "@/app/paths.js";
import { Link } from "react-router"
import { studio } from "@/data/site.js"
import { getServicePath } from "@/app/routes.js"
import Arrow from "@/components/ui/Arrow.jsx"

export default function CareSection() {
  return (
    <section
      className="care section-shell"
      id="cure"
      aria-labelledby="care-title"
    >
      <div className="care-intro">
        <p className="eyebrow">Le prestazioni</p>
        <h2 id="care-title">
          Protesi dentale
          <br />e implantologia.
        </h2>
        <div className="brand-study" aria-hidden="true">
          <img src={withBase("/brand/symbol-blue.svg")} alt="" width="140" height="160" />
        </div>
        <p>
          Dalla ricostruzione dei denti alla sostituzione di quelli mancanti:
          soluzioni protesiche su denti naturali o impianti, da valutare
          attraverso la visita e un piano di cura individuale.
        </p>
      </div>
      <div className="care-list">
        {studio.services.map((service, i) => (
          <details className="care-item" key={service.id} id={service.id}>
            <summary>
              <span className="item-index">0{i + 1}</span>
              <span>
                <h3>{service.title}</h3>
                <span className="item-description">{service.short}</span>
              </span>
              <span className="detail-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="care-detail">
              <p>{service.description}</p>
              <p className="detail-note">{service.detail}</p>
              <Link to={getServicePath(service.id)}>
                {service.id === "conservativa"
                  ? "Informazioni e appuntamenti"
                  : "Il percorso e le domande frequenti"}{" "}
                <Arrow />
              </Link>
            </div>
          </details>
        ))}
        <div className="other-care">
          <h3 id="other-care-title">Altre prestazioni</h3>
          {[0, 1].map((column) => (
            <ul key={column} aria-labelledby="other-care-title">
              {studio.otherServices
                .slice(
                  column * Math.ceil(studio.otherServices.length / 2),
                  (column + 1) * Math.ceil(studio.otherServices.length / 2),
                )
                .map((service) => <li key={service}>{service}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
