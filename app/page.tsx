// import { useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { Navigation } from '@/components/layout/Navigation';
import Hero from '@/sections/Hero';
import FeaturedMakes from '@/sections/FeaturedMakes';
import FeaturedInventory from '@/sections/FeaturedInventory';
import Stats from '@/sections/Stats';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';
// import './;
import './globals.css';

function App() {
  const { theme, setTheme } = useStore();

  // useEffect(() => {
  //   // Apply theme to document
  //   document.documentElement.classList.remove('light', 'dark');
  //   document.documentElement.classList.add(theme);
  // }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <Navigation onThemeToggle={toggleTheme} />

      {/* Main Content */}
      <main className="relative">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
