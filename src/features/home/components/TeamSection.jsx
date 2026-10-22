import { studio } from "@/data/site.js";

export default function TeamSection() {
  return (
    <section className="team section-shell" aria-labelledby="team-title">
      <div>
        <p className="eyebrow">I professionisti</p>
        <h2 id="team-title">
          Lo studio,
          <br />
          le persone.
        </h2>
      </div>
      <div className="team-roles">
        <article>
          <h3>Dott. {studio.professional.name}</h3>
          <p>
            Odontoiatra · Protesi dentale, implantologia, ortodonzia con
            allineatori e medicina estetica del viso.
          </p>
        </article>
        <article>
          <h3>Igienista dentale</h3>
          <p>
            Lo studio si avvale di un professionista dedicato all’igiene orale e
            alla prevenzione.
          </p>
        </article>
        <article>
          <h3>Odontoiatra per la conservativa</h3>
          <p>
            Un odontoiatra si dedica alla cura delle lesioni cariose e alle
            ricostruzioni dentali.
          </p>
        </article>
      </div>
    </section>
  );
}
