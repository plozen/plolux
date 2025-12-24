
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {/* Sidebar could go here in future */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
