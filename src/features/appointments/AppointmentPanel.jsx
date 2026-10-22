import { studio } from "@/data/site.js";

export default function AppointmentPanel() {
  const subject = encodeURIComponent("Richiesta di appuntamento");
  const body = encodeURIComponent(
    `Buongiorno,\nvorrei concordare un appuntamento con lo studio. Potete indicarmi le disponibilità e le modalità di prenotazione?\n\nGrazie.`,
  );
  return (
    <div className="appointment-panel" id="appuntamento">
      <p className="eyebrow">Il prossimo passo</p>
      <h3>Concordiamo la visita.</h3>
      <p>
        Puoi chiamare la segreteria oppure preparare una richiesta via email.
        Data e orario saranno confermati dallo studio.
      </p>
      <div className="appointment-actions">
        <a href={studio.phoneHref}>
          Chiama lo studio <span aria-hidden="true">↗</span>
        </a>
        <a href={`mailto:${studio.email}?subject=${subject}&body=${body}`}>
          Prepara la richiesta email <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="appointment-note">
        Si apre il tuo programma di posta: scegli tu se inviare. Non inserire
        referti o dettagli clinici.
      </p>
    </div>
  );
}
