# Studio Dentistico Deghaili

Sito in React con pagine HTML prerenderizzate.

## Sviluppo

Richiede Node.js 22.22 o successivo.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run lint
npm run build
```

I contenuti sono in `content/`, i componenti in `src/` e la grafica in `public/`. Il workflow pubblica `dist/` su GitHub Pages dopo ogni push su `main`. La configurazione `content/publication.json` controlla i dati editoriali e l’indicizzazione.
