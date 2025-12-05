import HeroSection from "@/components/hero-section";
import ImageShowcase from "@/components/image-showcase";
import NirdIntroSection from "@/components/nird-intro-section";
import WhyJoinSection from "@/components/why-join-section";
import NirdApproachSection from "@/components/nird-approach-section";
import NirdActorsSection from "@/components/nird-actors-section";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24">
      <HeroSection />
      <ImageShowcase />
      <NirdIntroSection />
      <WhyJoinSection />
      <NirdApproachSection />
      <NirdActorsSection />
    </div>
  );
}
