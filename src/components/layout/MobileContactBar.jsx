import { Link } from "react-router";
import { studio } from "@/data/site.js";
import Arrow from "@/components/ui/Arrow.jsx";

export default function MobileContactBar() {
  return (
    <nav className="mobile-contact" aria-label="Contatta lo studio">
      <a href={studio.phoneHref}>
        Chiama lo studio <Arrow />
      </a>
      <Link to="#appuntamento">
        Richiedi appuntamento <Arrow />
      </Link>
    </nav>
  );
}
