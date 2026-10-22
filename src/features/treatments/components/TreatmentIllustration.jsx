import { useIllustrationMotion } from "@/hooks/useIllustrationMotion.js";

const Crown = () => (
  <>
    <path d="M149 182c-13-41 8-64 35-58 15 3 24 13 36 13s23-12 39-12c28-1 42 25 32 59l-19 74c-5 19-22 27-52 27s-47-8-52-27Z" />
    <path
      d="M169 153c17 1 29 15 51 15s36-14 51-15M178 258c24 8 60 8 84 0"
      className="art-accent"
    />
  </>
);

const descriptions = {
  protesi: "Corona dentale, illustrazione stilizzata",
  impianti: "Corona e impianto dentale, illustrazione stilizzata",
  allineatori: "Allineatore trasparente, illustrazione stilizzata",
  estetica: "Profilo del viso, illustrazione stilizzata",
};

const captions = {
  protesi: "Rappresentazione schematica di una corona dentale.",
  impianti: "La corona e il supporto implantare, rappresentati separatamente.",
  allineatori: "Rappresentazione schematica di un allineatore rimovibile.",
  estetica: "Profilo del viso con un dettaglio grafico in evidenza.",
};

export default function TreatmentIllustration({ variant }) {
  const { ref, playing, disabled, toggle } = useIllustrationMotion(variant);
  return (
    <figure ref={ref} className={`treatment-art treatment-art-${variant}`}>
      <svg viewBox="0 0 440 440" role="img" aria-label={descriptions[variant]}>
        <circle className="art-orbit" cx="220" cy="220" r="168" />
        <g className="art-lines">
          {variant === "protesi" && (
            <>
              <g transform="translate(-22 -16) scale(1.1)">
                <g className="art-motion"><Crown /></g>
              </g>
              <path
                className="art-accent"
                d="M148 321h144M148 316v10m144-10v10"
              />
            </>
          )}
          {variant === "impianti" && (
            <>
              <g transform="translate(33 -10) scale(.85)">
                <g className="art-motion"><Crown /></g>
              </g>
              <path d="M203 244v15h34v-15M198 270h44l-8 71c-2 15-26 15-28 0Z" />
              <path
                className="art-accent"
                d="m199 281 43-7m-41 22 39-7m-38 22 37-7m-35 22 34-7m-32 22 29-7"
              />
            </>
          )}
          {variant === "allineatori" && (
            <g className="art-motion">
              <path d="M111 164c-17 19-24 47-24 70 0 58 59 102 133 102s133-44 133-102c0-23-7-51-24-70l-29 13c11 17 16 33 16 49 0 38-43 67-96 67s-96-29-96-67c0-16 5-32 16-49Z" />
              <path
                className="art-accent"
                d="M111 164c-10 17-14 34-14 50 0 47 54 82 123 82s123-35 123-82c0-16-4-33-14-50"
              />
              <path
                d="m120 264-16 20m42 0-10 29m43-20-5 36m46-36v43m41-43 5 36m28-45 10 29m16-49 16 20"
                className="art-accent"
              />
            </g>
          )}
          {variant === "estetica" && (
            <>
              <path d="M174 105c53-23 104 9 102 65l-1 24c0 9 10 19 22 30 7 7 4 13-7 15l-12 2c6 12 5 19-2 24 5 18-4 31-23 37-6 2-10 12-9 23l4 22M174 105c-41 18-52 61-38 105 5 17 15 32 26 48 12 18 14 49 6 75" />
              <path
                className="art-accent"
                d="M247 269c9 2 17 1 24-2M246 190l15 2"
              />
              <g className="art-motion"><circle className="art-accent" cx="209" cy="228" r="30" /></g>
            </>
          )}
        </g>
      </svg>
      <figcaption>{captions[variant]}<span>Illustrazione indicativa, non rappresenta un risultato clinico.</span></figcaption>
      <button className="art-toggle" type="button" onClick={toggle} disabled={disabled} aria-pressed={playing}>
        {playing ? "Ferma animazione" : "Anima illustrazione"}
      </button>
      {disabled && <p className="art-motion-note">Versione statica: movimento ridotto o animazione non disponibile.</p>}
    </figure>
  );
}
