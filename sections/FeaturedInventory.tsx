'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { CarCard } from '@/components/cards/CarCard';
import { cars } from '@/data/cars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedInventory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const featuredCars = cars.slice(0, 6);

  return (
    <section id="inventory" ref={sectionRef} className="w-full py-24 relative overflow-hidden bg-white">
      <div className="w-full section-padding relative">
        {/* Section Header - Centered */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 text-gray-900">
              Premium <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Selection</span>
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Hand-picked vehicles from our verified dealer network,
              featuring the finest Japanese automobiles available for export.
            </p>
          </div>
        </FadeIn>

        {/* Car Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCars.map((car, index) => (
            <StaggerItem key={car.id}>
              <CarCard car={car} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            size="lg"
            className="bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-xl px-8 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            Browse Full Inventory
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}