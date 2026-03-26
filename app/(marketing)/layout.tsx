import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComparisonBar } from "@/components/comparison-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        // Override dark theme variables with light theme values
        // '--background': '210 40% 98%',
        // '--foreground': '222 47% 11%',
        // '--card': '0 0% 100%',
        // '--card-foreground': '222 47% 11%',
        // '--popover': '0 0% 100%',
        // '--popover-foreground': '222 47% 11%',
        // '--primary': '221 83% 53%',
        // '--primary-foreground': '210 40% 98%',
        // '--secondary': '210 40% 96.1%',
        // '--secondary-foreground': '222 47% 11.2%',
        // '--muted': '210 40% 96.1%',
        // '--muted-foreground': '215.4 16.3% 46.9%',
        // '--accent': '210 40% 96.1%',
        // '--accent-foreground': '222.2 47.4% 11.2%',
        // '--destructive': '0 84.2% 60.2%',
        // '--destructive-foreground': '210 40% 98%',
        // '--border': '214.3 31.8% 91.4%',
        // '--input': '214.3 31.8% 91.4%',
        // '--ring': '221 83% 53%',
      } as React.CSSProperties}
    >
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ComparisonBar />
    </div>
  );
}