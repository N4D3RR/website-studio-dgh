import { Navigate, Route, Routes } from "react-router";
import SiteLayout from "@/components/layout/SiteLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import TreatmentPage from "@/pages/TreatmentPage.jsx";
import LegalPage from "@/pages/LegalPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import { homeRoute, treatmentRoutes, legalRoutes } from "./routes.js";
import RouteEffects from "./RouteEffects.jsx";
export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path={homeRoute.path} element={<HomePage />} />
          {treatmentRoutes.map(({ path, treatment }) => (
            <Route
              key={path}
              path={path}
              element={<TreatmentPage treatment={treatment} />}
            />
          ))}
        </Route>
        <Route
          path="/invisalign.html"
          element={<Navigate to="/allineatori.html" replace />}
        />
        {legalRoutes.map(({ path, cookies }) => (
          <Route
            key={path}
            path={path}
            element={<LegalPage cookies={cookies} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
