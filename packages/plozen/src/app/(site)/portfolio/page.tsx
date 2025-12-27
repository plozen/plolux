"use client";

import PortfolioGrid from "@/components/organisms/Portfolio/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Work</h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          혁신적인 기술과 창의적인 디자인으로<br /> 
          디지털 경험의 새로운 기준을 만듭니다.
        </p>
      </div>
      
      <PortfolioGrid />
    </div>
  );
}
