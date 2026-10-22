import { studio } from "@/data/site.js";
import Arrow from "@/components/ui/Arrow.jsx";
import AppointmentPanel from "./AppointmentPanel.jsx";

export default function ContactSection() {
  return (
    <section
      className="contact section-shell"
      id="contatti"
      aria-labelledby="contact-title"
    >
      <div className="contact-heading">
        <p className="eyebrow">Contatti e orari</p>
        <h2 id="contact-title">
          Lo studio
          <br />a Padova.
        </h2>
        <a className="contact-phone" href={studio.phoneHref}>
          {studio.phone} <Arrow />
        </a>
        <a className="email-link" href={`mailto:${studio.email}`}>
          {studio.email} <Arrow />
        </a>
        <p>
          La segreteria concorda data e orario dell’appuntamento. Per
          informazioni via email, non inviare dati clinici o referti.
        </p>
      </div>
      <div className="contact-information">
        <address>
          {studio.address}
          <br />
          {studio.postalCode} {studio.city} ({studio.province})
        </address>
        <a
          className="map-link"
          href={studio.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Indicazioni su Google Maps <Arrow />
          <span className="sr-only"> (si apre in una nuova scheda)</span>
        </a>
        <h3>Orari della segreteria</h3>
        <dl className="hours">
          {studio.hours.map(({ day, slots }) => (
            <div key={day}>
              <dt>{day}</dt>
              <dd>
                {slots.length
                  ? slots.map((slot) => <span key={slot}>{slot}</span>)
                  : "Chiuso"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <AppointmentPanel />
    </section>
  );
}
