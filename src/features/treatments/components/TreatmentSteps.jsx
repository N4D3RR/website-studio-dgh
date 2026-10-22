export default function TreatmentSteps({ sections }) {
  return (
    <section className="treatment-body section-shell" aria-label="Il percorso">
      <div>
        <p className="eyebrow">Informazioni sul percorso</p>
        <h2>
          Capire, prima
          <br />
          di decidere.
        </h2>
      </div>
      <ol className="treatment-steps">
        {sections.map((section, i) => (
          <li key={section.title}>
            <span className="item-index">0{i + 1}</span>
            <div>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
