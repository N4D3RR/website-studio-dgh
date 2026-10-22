// Percorsi pubblici validi sia alla radice sia sotto il nome del repository.
export const withBase = (path = "") =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
