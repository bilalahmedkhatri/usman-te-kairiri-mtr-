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
        className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center mb-4 transition-all duration-300 p-3">
          <Image
            src={make.logo}
            alt={`${make.name} logo`}
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="font-semibold text-base group-hover:text-red-600 transition-colors text-gray-900">{make.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{make.country}</p>

        {make.popular && (
          <Badge className="absolute top-3 right-3 bg-red-50 text-red-600 border-0 text-[8px]">
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
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />

      <div className="w-full section-padding relative">
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 text-gray-900">
            Popular <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Japanese</span> Brands
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Explore vehicles from Japan&apos;s most prestigious automotive manufacturers,
            from legendary sports cars to luxury sedans.
          </p>
        </FadeIn>

        {/* Popular Makes Grid */}
        <div className="mb-12">
          <h3 className="text-base font-semibold mb-6 text-gray-900">Top Brands</h3>
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMakes.map((make) => (
              <MakeCard key={make.id} make={make} />
            ))}
          </StaggerContainer>
        </div>

        {/* All Makes Grid */}
        <div>
          <h3 className="text-xl font-bold text-center mb-12 text-gray-900">All Brands</h3>
          <StaggerContainer staggerDelay={0.05} className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {carMakes.map((make, index) => (
              <motion.a
                key={make.id}
                href={`#inventory?make=${make.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white flex flex-col items-center gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all duration-200 p-2">
                  <Image
                    src={make.logo}
                    alt={`${make.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs font-medium text-center text-gray-700">{make.name}</span>
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}