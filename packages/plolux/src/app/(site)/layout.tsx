import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-layout">
      <Header />
      <main style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
