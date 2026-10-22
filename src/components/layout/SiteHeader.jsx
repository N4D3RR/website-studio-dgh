import { withBase } from "@/app/paths.js";
import { Link, useLocation } from "react-router";
import { studio } from "@/data/site.js";
import { getHomeHref } from "@/app/routes.js";
import { useMobileMenu } from "@/hooks/useMobileMenu.js";

export default function SiteHeader() {
  const { pathname } = useLocation();
  const { isOpen, toggle, close } = useMobileMenu();
  return (
    <header className="site-header">
      <Link
        className="brand"
        to={getHomeHref(pathname, "#inizio")}
        aria-label={`${studio.name}, inizio`}
        onClick={close}
      >
        <img
          src={withBase("/brand/logo-white.svg")}
          alt="Deghaili — Studio dentistico"
          width="228"
          height="75"
        />
      </Link>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onClick={toggle}
      >
        <span />
        <span />
      </button>
      <nav
        id="site-nav"
        aria-label="Navigazione principale"
        className={isOpen ? "is-open" : ""}
      >
        <Link to={getHomeHref(pathname, "#studio")} onClick={close}>
          Lo studio
        </Link>
        <Link to={getHomeHref(pathname, "#cure")} onClick={close}>
          Le prestazioni
        </Link>
        <Link to="#come-raggiungerci" onClick={close}>
          Come raggiungerci
        </Link>
        <Link to="#contatti" onClick={close}>
          Contatti
        </Link>
        <a className="nav-phone" href={studio.phoneHref}>
          <span aria-hidden="true">↗</span> {studio.phone}
        </a>
      </nav>
    </header>
  );
}
