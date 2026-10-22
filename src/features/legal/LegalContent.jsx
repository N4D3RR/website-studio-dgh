import { studio, publication } from "@/data/site.js";
export default function LegalContent({ cookies = false }) {
  return (
    <>
      <p className="eyebrow">Informazioni sul sito</p>
      <h2 id="legal-title">
        {cookies ? "Cookie e servizi esterni" : "Dati personali e contatti"}
      </h2>
      {!cookies && publication.approved ? (
        <p className="privacy-notice">{publication.privacyNotice}</p>
      ) : cookies ? (
        <>
          <p>
            Questa versione del sito non utilizza strumenti di analisi,
            pubblicità, pixel di tracciamento o cookie impostati dal codice
            dell’applicazione.
          </p>
          <p>
            Caratteri tipografici e grafica sono serviti insieme al sito. La
            mappa è un collegamento esterno: Google viene contattato solo se
            scegli di aprirlo.
          </p>
          <p>
            {publication.hostingNotice ||
              "L’eventuale infrastruttura di pubblicazione può trattare dati tecnici secondo la propria configurazione."}
          </p>
        </>
      ) : (
        <>
          {publication.legalOwner && (
            <p>
              Titolare del trattamento: {publication.legalOwner}, con sede in{" "}
              {publication.legalAddress}. Contatto:{" "}
              <a href={`mailto:${studio.email}`}>{studio.email}</a>.
            </p>
          )}
          <p>
            Il sito presenta informazioni sull’attività dello studio e i
            recapiti per contattare la segreteria. Non contiene moduli per
            l’invio di dati, referti o documentazione sanitaria.
          </p>
          <p>
            Il collegamento email apre il tuo programma di posta con un oggetto
            generico, senza indicare il trattamento desiderato. L’invio avviene
            solo se lo confermi nel programma. Per una richiesta di
            appuntamento, non inserire dettagli clinici o allegare referti.
          </p>
          <p>
            Il gestore del servizio di pubblicazione può trattare dati tecnici
            di connessione, come l’indirizzo IP, per erogare e proteggere il
            sito. Per informazioni sul trattamento dei dati da parte dello
            studio: <a href={`mailto:${studio.email}`}>{studio.email}</a>.
          </p>
        </>
      )}
    </>
  );
}
