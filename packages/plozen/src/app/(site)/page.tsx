import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import PerformanceSection from "@/components/organisms/PerformanceSection/PerformanceSection";
import PlaceholderSection from "@/components/organisms/PlaceholderSection/PlaceholderSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PerformanceSection />
      <PlaceholderSection title="New Section 1" variant="primary" />
      <PlaceholderSection title="New Section 2" variant="secondary" />
    </main>
  );
}
