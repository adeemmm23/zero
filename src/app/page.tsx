import HeroSection from "@/components/hero-section";
import ImageShowcase from "@/components/image-showcase";
import WhyJoinSection from "@/components/why-join-section";
import NirdApproachSection from "@/components/nird-approach-section";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <ImageShowcase />
      <WhyJoinSection />
      <NirdApproachSection />
    </div>
  );
}
