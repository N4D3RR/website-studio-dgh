import SectionCards from "@/components/layout/SectionCards.jsx";
import { studio } from "@/data/site.js"
import HomeHero from "@/features/home/components/HomeHero.jsx"
import CareSection from "@/features/home/components/CareSection.jsx"
import PathwaysSection from "@/features/home/components/PathwaysSection.jsx"
import MethodSection from "@/features/home/components/MethodSection.jsx"
import TeamSection from "@/features/home/components/TeamSection.jsx"
import FaqSection from "@/components/ui/FaqSection.jsx"
export default function HomePage() {
  return (
    <SectionCards>
      <HomeHero />
      <CareSection />
      <PathwaysSection />
      <MethodSection />
      <TeamSection />
      <FaqSection
        id="questions-title"
        eyebrow="Informazioni utili"
        title={
          <>
            Prima{" "}
            <br />
            della visita.
          </>
        }
        items={studio.faq}
      />
    </SectionCards>
  )
}
