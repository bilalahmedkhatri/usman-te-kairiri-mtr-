'use client';
import { useRef } from 'react';
import Image from 'next/image';
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
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl bg-white/90 group-hover:bg-white flex items-center justify-center mb-4 transition-all duration-300 p-3">
          <Image
            src={make.logo}
            alt={`${make.name} logo`}
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="font-semibold text-base group-hover:text-red transition-colors">{make.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{make.country}</p>

        {make.popular && (
          <Badge className="absolute top-3 right-3 bg-red/10 text-red border-0 text-[8px]">
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
          <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4">
            Popular <span className="gradient-text">Japanese</span> Brands
          </h2>
          <p className="text-muted-foreground text-base">
            Explore vehicles from Japan&apos;s most prestigious automotive manufacturers,
            from legendary sports cars to luxury sedans.
          </p>
        </FadeIn>

        {/* Popular Makes Grid */}
        <div className="mb-12">
          <h3 className="text-base font-semibold mb-6">Top Brands</h3>
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMakes.map((make) => (
              <MakeCard key={make.id} make={make} />
            ))}
          </StaggerContainer>
        </div>

        {/* All Makes Grid */}
        <div>
          <h3 className="text-xl font-bold text-center mb-12">All Brands</h3>
          <StaggerContainer staggerDelay={0.05} className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {carMakes.map((make, index) => (
              <motion.a
                key={make.id}
                href={`#inventory?make=${make.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white flex flex-col items-center gap-3 cursor-pointer p-4 rounded-xl border border-border/30 bg-card/30 hover:bg-card hover:border-border/50 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 p-2">
                  <Image
                    src={make.logo}
                    alt={`${make.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs font-medium text-center text-foreground">{make.name}</span>
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}