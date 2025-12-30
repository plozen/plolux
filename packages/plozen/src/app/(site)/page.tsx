import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import PerformanceSection from "@/components/organisms/PerformanceSection/PerformanceSection";
import ProductSection from "@/components/organisms/ProductSection/ProductSection";
import TechnicalSection from "@/components/organisms/TechnicalSection/TechnicalSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PerformanceSection />
      <ProductSection />
      <TechnicalSection />
    </main>
  );
}
