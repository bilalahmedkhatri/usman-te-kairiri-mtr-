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
    <section id="inventory" ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      <div className="w-full section-padding relative">
        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Badge className="bg-red/20 text-red border-0 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured Inventory
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Premium <span className="gradient-text">Selection</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Hand-picked vehicles from our verified dealer network, 
              featuring the finest Japanese automobiles available for export.
            </p>
          </div>
          <Button variant="outline" className="w-fit rounded-xl px-6 border-border/50 hover:bg-secondary/50 group">
            View All Vehicles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
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
            className="bg-gradient-to-r from-red to-orange hover:from-red/90 hover:to-orange/90 text-white font-semibold rounded-xl px-8 shadow-jdm transition-all duration-300 group"
          >
            Browse Full Inventory
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}