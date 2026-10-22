import SectionCards from "@/components/layout/SectionCards.jsx";
import TreatmentHero from "@/features/treatments/components/TreatmentHero.jsx"
import TreatmentSteps from "@/features/treatments/components/TreatmentSteps.jsx"
import RelatedTreatments from "@/features/treatments/components/RelatedTreatments.jsx"
import FaqSection from "@/components/ui/FaqSection.jsx"

export default function TreatmentPage({ treatment }) {
  return (
    <SectionCards>
      <TreatmentHero treatment={treatment} />
      <TreatmentSteps sections={treatment.sections} />
      <FaqSection
        id="treatment-faq-title"
        eyebrow={treatment.title}
        title={
          <>
            Domande sulla cura{" "}
            <br />
            più frequenti.
          </>
        }
        items={treatment.faq}
      />
      <RelatedTreatments treatment={treatment} />
    </SectionCards>
  )
}
