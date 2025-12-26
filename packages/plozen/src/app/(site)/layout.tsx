import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-layout">
      <Header />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
