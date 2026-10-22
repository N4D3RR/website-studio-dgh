import { Link } from "react-router";
import { treatments } from "@/data/site.js";
import Arrow from "@/components/ui/Arrow.jsx";

export default function PathwaysSection() {
  return (
    <section
      className="pathways section-shell"
      aria-labelledby="pathways-title"
    >
      <div className="pathways-heading">
        <p className="eyebrow">I percorsi dello studio</p>
        <h2 id="pathways-title">
          Informazioni dedicate.
          <br />
          Un punto di partenza.
        </h2>
      </div>
      <div className="pathway-grid">
        {treatments.map((item, i) => (
          <Link className="pathway" to={item.path} key={item.id}>
            <span className="item-index">0{i + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.sections[0].title}</p>
            <span className="pathway-link">
              Esplora il percorso <Arrow />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
