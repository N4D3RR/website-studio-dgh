import { useRef } from "react";
import { Link } from "react-router";
import Arrow from "@/components/ui/Arrow.jsx";
import { useEntranceAnimation } from "@/hooks/useEntranceAnimation.js";

export default function HomeHero() {
  const heroRef = useRef(null);
  useEntranceAnimation(heroRef);
  return (
    <section
      ref={heroRef}
      className="hero section-shell"
      id="inizio"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow hero-enter">Odontoiatria · Padova</p>
        <h1 id="hero-title" className="hero-enter">
          Studio dentistico
          <br />
          <span>Dott. Deghaili.</span>
        </h1>
        <p className="hero-description hero-enter">
          Prestazioni odontoiatriche e piani di cura personalizzati.
          Informazioni sullo studio, sui trattamenti e sulle modalità di
          appuntamento.
        </p>
        <div className="hero-actions hero-enter">
          <Link className="visit-link" to="#appuntamento">
            Richiedi un appuntamento <Arrow />
          </Link>
          <Link className="explore-link" to={"#cure"}>
            Le prestazioni <span aria-hidden="true">↓</span>
          </Link>
        </div>
        <p className="hero-appointment hero-enter">
          Si riceve su appuntamento.
        </p>
      </div>
      <div className="hero-baseline">
        <span>Visita. Diagnosi. Piano di cura.</span>
        <Link to={"#cure"} aria-label="Vai alle prestazioni">
          <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
