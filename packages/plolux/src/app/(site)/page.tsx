import HeroSection from '@/components/organisms/landing/HeroSection/HeroSection';
import USPSection from '@/components/organisms/landing/USPSection/USPSection';
import ServiceSummarySection from '@/components/organisms/landing/ServiceSummarySection/ServiceSummarySection';
import PortfolioSection from '@/components/organisms/landing/PortfolioSection/PortfolioSection';
import CTASection from '@/components/organisms/landing/CTASection/CTASection';

export default function HomePage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <USPSection />
      <ServiceSummarySection />
      <PortfolioSection />
      <CTASection />
    </div>
  );
}
