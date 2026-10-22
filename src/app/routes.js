import { treatments } from "@/data/site.js";
export const homeRoute = {
  id: "home",
  path: "/",
  kind: "home",
  indexable: true,
  title: "Studio Dentistico Dott. Deghaili | Padova",
  description:
    "Studio Deghaili a Padova: protesi, implantologia, allineatori trasparenti e medicina estetica del viso. Informazioni, professionisti e appuntamenti.",
};
export const treatmentRoutes = treatments.map((treatment) => ({
  id: treatment.id,
  path: treatment.path,
  kind: "treatment",
  indexable: true,
  title: `${treatment.title} a Padova | Studio Deghaili`,
  description: treatment.description,
  treatment,
}));
export const legalRoutes = [
  {
    id: "privacy",
    path: "/privacy.html",
    kind: "legal",
    cookies: false,
    indexable: false,
    title: "Dati personali e contatti | Studio Deghaili",
    description:
      "Informazioni sul trattamento dei dati e sui contatti dello Studio Deghaili.",
  },
  {
    id: "cookie",
    path: "/cookie.html",
    kind: "legal",
    cookies: true,
    indexable: false,
    title: "Cookie e servizi esterni | Studio Deghaili",
    description:
      "Informazioni sui cookie e sui servizi esterni del sito dello Studio Deghaili.",
  },
];
export const notFoundRoute = {
  id: "not-found",
  path: "/404.html",
  kind: "not-found",
  indexable: false,
  title: "Pagina non trovata | Studio Deghaili",
  description:
    "La pagina richiesta non è disponibile. Torna al sito dello Studio Deghaili.",
};
export const siteRoutes = [
  homeRoute,
  ...treatmentRoutes,
  ...legalRoutes,
  notFoundRoute,
];
export const getRoute = (pathname) =>
  siteRoutes.find((route) => route.path === pathname) ?? notFoundRoute;
export const getHomeHref = (pathname, hash) =>
  pathname === "/" ? hash : `/${hash}`;
const serviceTreatments = { chirurgia: "impianti", ortodonzia: "allineatori" };
export const getServicePath = (id) =>
  treatmentRoutes.find((route) => route.id === (serviceTreatments[id] ?? id))
    ?.path ?? "#contatti";
