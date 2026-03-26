import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComparisonBar } from "@/components/comparison-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ComparisonBar />
    </div>
  );
}