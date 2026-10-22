import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "@/app/App.jsx";
import { withBase } from "@/app/paths.js";

export const renderPage = (path) =>
  renderToString(
    <StaticRouter basename={import.meta.env.BASE_URL} location={withBase(path)}>
      <App />
    </StaticRouter>,
  );
