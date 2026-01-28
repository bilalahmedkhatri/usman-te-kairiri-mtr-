'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { carMakes, popularMakes } from '@/data/cars';
import { Badge } from '@/components/ui/badge';

interface MakeCardProps {
  make: typeof carMakes[0];
}

function MakeCard({ make }: MakeCardProps) {
  return (
    <StaggerItem>
      <motion.a
        href={`#inventory?make=${make.id}`}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-card rounded-2xl p-6 border border-border/30 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-center text-center"
      >
        {/* Logo Placeholder */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 group-hover:from-red/10 group-hover:to-orange/10 transition-colors">
          <span className="text-2xl font-bold text-muted-foreground group-hover:text-red transition-colors">
            {make.name.charAt(0)}
          </span>
        </div>
        <h3 className="font-semibold text-lg group-hover:text-red transition-colors">{make.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{make.country}</p>

        {make.popular && (
          <Badge className="absolute top-3 right-3 bg-red/10 text-red border-0 text-[10px]">
            Popular
          </Badge>
        )}
      </motion.a>
    </StaggerItem>
  );
}

export default function FeaturedMakes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="w-full section-padding relative">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-red/20 text-red border-0 mb-4">Browse by Make</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Popular <span className="gradient-text">Japanese</span> Brands
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore vehicles from Japan's most prestigious automotive manufacturers,
            from legendary sports cars to luxury sedans.
          </p>
        </FadeIn>

        {/* Popular Makes Grid */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6">Top Brands</h3>
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {popularMakes.map((make) => (
              <MakeCard key={make.id} make={make} />
            ))}
          </StaggerContainer>
        </div>

        {/* All Makes Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-6">All Brands</h3>
          <StaggerContainer staggerDelay={0.05} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
            {carMakes.map((make, index) => (
              <motion.a
                key={make.id}
                href={`#inventory?make=${make.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="group flex flex-col items-center p-4 rounded-xl bg-card/50 hover:bg-card border border-border/30 hover:border-red/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-2 group-hover:bg-red/10 transition-colors">
                  <span className="text-sm font-bold text-muted-foreground group-hover:text-red transition-colors">
                    {make.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs font-medium text-center group-hover:text-red transition-colors">{make.name}</span>
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}