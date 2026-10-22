import { studio } from "@/data/site.js";
import Arrow from "@/components/ui/Arrow.jsx";

const travelModes = [
  {
    id: "driving",
    title: "In auto",
    text: "Apri il percorso stradale e imposta il punto di partenza.",
  },
  {
    id: "transit",
    title: "Con i mezzi",
    text: "Consulta collegamenti e orari per il giorno della visita su Google Maps.",
  },
  {
    id: "walking",
    title: "A piedi",
    text: "Visualizza il percorso pedonale fino all’indirizzo dello studio.",
  },
];

export default function DirectionsSection() {
  const destination = `${studio.address}, ${studio.postalCode} ${studio.city}`;
  return (
    <section
      className="directions section-shell"
      id="come-raggiungerci"
      aria-labelledby="directions-title"
    >
      <div className="directions-heading">
        <p className="eyebrow">Organizza la visita</p>
        <h2 id="directions-title">Come<br />raggiungerci.</h2>
        <address>
          {studio.address}<br />
          {studio.postalCode} {studio.city} ({studio.province})
        </address>
        <div className="directions-parking">
          <h3>Parcheggio privato</h3>
          <p>Circa {studio.parking.approximateSpaces} posti auto.</p>
        </div>
        <p>
          Per informazioni sull’ingresso o sull’accesso allo studio,
          contatta la segreteria prima della visita.
        </p>
        <a className="directions-phone" href={studio.phoneHref}>
          Chiama la segreteria <Arrow />
        </a>
      </div>
      <div className="directions-routes">
        {travelModes.map(({ id, title, text }, index) => {
          const query = new URLSearchParams({
            api: "1", destination, travelmode: id,
          });
          return (
            <a
              key={id}
              className="directions-route"
              href={`https://www.google.com/maps/dir/?${query}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="item-index" aria-hidden="true">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                {id === "driving" && (
                  <p className="directions-parking-inline">
                    Parcheggio privato: circa {studio.parking.approximateSpaces} posti auto.
                  </p>
                )}
                <span className="directions-route-label">
                  Indicazioni su Google Maps <Arrow />
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </span>
              </div>
            </a>
          );
        })}
        <p className="directions-note">
          I percorsi si aprono su Google Maps. Puoi inserire la partenza senza
          condividerla con questo sito.
        </p>
      </div>
    </section>
  );
}
