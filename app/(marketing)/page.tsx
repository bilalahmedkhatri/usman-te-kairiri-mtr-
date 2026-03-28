import { Suspense } from 'react';
import Hero from '@/sections/Hero';
import FeaturedMakes from '@/sections/FeaturedMakes';
import FeaturedInventory from '@/server/components/FeaturedInventory'; // Import server component
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';
import { getHeroCars } from '@/app/actions/get-hero-cars';
import { FeaturedInventorySkeleton } from '@/components/FeaturedInventorySkeleton';

export default async function MarketingPage() {
  const heroCars = await getHeroCars();

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300">
      <main className="relative">
        <div className="mx-auto text-center">
          <Hero cars={heroCars} />
          <FeaturedMakes />
          <Suspense fallback={<FeaturedInventorySkeleton />}>
            <FeaturedInventory />
          </Suspense>
          <Testimonials />
          <CTA />
        </div>
      </main>
    </div>
  );
}