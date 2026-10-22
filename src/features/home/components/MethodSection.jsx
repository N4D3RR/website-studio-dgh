import { studio, publication } from "@/data/site.js";

export default function MethodSection() {
  return (
    <section
      className="method section-shell"
      id="studio"
      aria-labelledby="method-title"
    >
      <div className="method-heading">
        <p className="eyebrow">Lo studio e la visita</p>
        <h2 id="method-title">
          Il percorso
          <br />
          odontoiatrico.
        </h2>
        <p>
          {studio.name} svolge la propria attività a {studio.city}. Le visite e
          i trattamenti si effettuano su appuntamento.
        </p>
        <div className="professional">
          <span>Professionista</span>
          <strong>Dott. {studio.professional.name}</strong>
          <p>
            {studio.professional.title} · Iscrizione Albo n.{" "}
            {studio.professional.registerNumber}
            {publication.approved && <> · {publication.professionalOrder}</>}
          </p>
        </div>
      </div>
      <ol className="steps">
        {studio.steps.map((step, i) => (
          <li key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
