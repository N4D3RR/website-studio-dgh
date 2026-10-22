import { Link } from "react-router";
import { treatments } from "@/data/site.js";
function TreatmentLinks({ current }) {
  return (
    <nav className="treatment-links" aria-label="Percorsi di cura">
      {treatments
        .filter((item) => item.id !== current)
        .map((item) => (
          <Link key={item.id} to={item.path}>
            {item.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
    </nav>
  );
}

export default function RelatedTreatments({ treatment }) {
  return (
    <section
      className="related-care section-shell"
      aria-labelledby="related-title"
    >
      <p className="eyebrow" id="related-title">
        Gli altri percorsi dello studio
      </p>
      <TreatmentLinks current={treatment.id} />
    </section>
  );
}
