import HeroSection from "@/components/hero/HeroSection";
import GrainOverlay from "@/components/hero/GrainOverlay";
import TaglineSection from "@/components/tagline/TaglineSection";

export default function Home() {
  return (
    <main>
      <GrainOverlay />
      <HeroSection />
      <TaglineSection />
    </main>
  );
}
