export default function FaqSection({ id, eyebrow, title, items }) {
  return (
    <section className="questions section-shell" aria-labelledby={id}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="faq-list">
        {items.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
