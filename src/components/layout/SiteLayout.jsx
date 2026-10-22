import { useRef, useState } from "react";
import { Outlet } from "react-router";
import { useSectionReveal } from "@/hooks/useSectionReveal.js";
import { useSmoothCardScroll } from "@/hooks/useSmoothCardScroll.js";
import DirectionsSection from "@/features/appointments/DirectionsSection.jsx";
import ContactSection from "@/features/appointments/ContactSection.jsx";
import LegalDialog from "@/features/legal/LegalDialog.jsx";
import SiteHeader from "./SiteHeader.jsx";
import SectionCards from "./SectionCards.jsx";
import SiteFooter from "./SiteFooter.jsx";
import MobileContactBar from "./MobileContactBar.jsx";

export default function SiteLayout() {
  const [legal, setLegal] = useState(null);
  const mainRef = useRef(null);
  useSectionReveal(mainRef);
  useSmoothCardScroll(mainRef);
  return (
    <div>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <SiteHeader />
      <main ref={mainRef} id="contenuto" tabIndex={-1}>
        <Outlet />
        <SectionCards>
          <DirectionsSection />
          <ContactSection />
        </SectionCards>
      </main>
      <SiteFooter onOpenLegal={setLegal} />
      <MobileContactBar />
      {legal && <LegalDialog kind={legal} onClose={() => setLegal(null)} />}
    </div>
  );
}
