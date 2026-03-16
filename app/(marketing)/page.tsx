import Hero from '@/sections/Hero';
import FeaturedMakes from '@/sections/FeaturedMakes';
import FeaturedInventory from '@/sections/FeaturedInventory';
import Stats from '@/sections/Stats';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';
import { getHeroCars } from '@/app/actions/get-hero-cars';

export default async function MarketingPage() {
  const heroCars = await getHeroCars();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <main className="relative">
        <div className="max-w-7xl mx-auto p-8 text-center">
          <Hero cars={heroCars} />
          {/* <Stats /> */}
          <FeaturedMakes />
          <FeaturedInventory />
          <Testimonials />
          <CTA />
        </div>
      </main>
    </div>
  );
}
