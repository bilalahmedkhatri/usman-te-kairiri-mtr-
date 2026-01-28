"use client";

import Hero from "@/sections/Hero";
import FeaturedMakes from "@/sections/FeaturedMakes";
import FeaturedInventory from "@/sections/FeaturedInventory";
import Stats from "@/sections/Stats";
import Testimonials from "@/sections/Testimonials";
import CTA from "@/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Main Content */}
      <main className="positive">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* Featured Makes Section */}
        <FeaturedMakes />

        {/* Featured Inventory Section */}
        <FeaturedInventory />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <CTA />
      </main>
    </div>
  );
}