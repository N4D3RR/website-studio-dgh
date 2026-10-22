import { Link } from "react-router";
import { studio } from "@/data/site.js";
import TreatmentIllustration from "./TreatmentIllustration.jsx";

export default function TreatmentHero({ treatment }) {
  return (
    <section
      className="treatment-hero section-shell"
      id="inizio"
      aria-labelledby="treatment-title"
    >
      <Link className="back-link" to="/#cure">
        ← Tutte le prestazioni
      </Link>
      <div className="treatment-heading">
        <div>
          <p className="eyebrow">{treatment.eyebrow}</p>
          <h1 id="treatment-title">{treatment.title}</h1>
          <p className="treatment-intro">{treatment.intro}</p>
          <Link className="visit-link" to="#appuntamento">
            Richiedi un appuntamento <span aria-hidden="true">↗</span>
          </Link>
          <p className="treatment-reference">
            Dott. {studio.professional.name}
            <br />
            {studio.professional.title}
            {treatment.credential && (
              <>
                <br />
                <span>{treatment.credential}</span>
              </>
            )}
          </p>
        </div>
        <TreatmentIllustration variant={treatment.id} />
      </div>
    </section>
  );
}
