'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Search, Gauge, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { HeroCar } from '@/app/actions/get-hero-cars';

interface FloatingCarCardProps {
  car: HeroCar;
  index: number;
}

function FloatingCarCard({ car, index }: FloatingCarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const positions = [
    { top: '10%', right: '5%', rotate: -5, size: 'w-64' },
    { top: '35%', right: '20%', rotate: 8, size: 'w-56' },
    { bottom: '15%', right: '10%', rotate: -3, size: 'w-52' },
  ];

  const pos = positions[index % 3];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate * 2 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: pos.rotate,
        y: isHovered ? -10 : 0,
      }}
      transition={{
        duration: 1.2,
        delay: 0.4 + index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`absolute ${pos.size} hidden lg:block cursor-pointer z-20`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...(pos.top !== undefined && { top: pos.top }),
        ...(pos.bottom !== undefined && { bottom: pos.bottom }),
        right: pos.right,
      }}
    >
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-100"
      >
        <div className="relative">
          <Image
            src={car.images[0]}
            width={300}
            height={200}
            alt={`${car.make} ${car.model}`}
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-semibold truncate">{car.make} {car.model}</p>
            <p className="text-white/80 text-xs">{car.year}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface HeroProps {
  cars: HeroCar[];
}

export default function Hero({ cars = [] }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const backgroundX = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });
  const backgroundY = useSpring(useMotionValue(0), { stiffness: 50, damping: 30 });

  useEffect(() => {
    backgroundX.set((mousePosition.x - 0.5) * 20);
    backgroundY.set((mousePosition.y - 0.5) * 20);
  }, [mousePosition, backgroundX, backgroundY]);

  const featuredCars = cars.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Full Width Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[1000px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(220, 38, 38, 0) 70%)',
            x: backgroundX,
            y: backgroundY,
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[1100px] h-[750px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%)',
            x: useTransform(backgroundX, v => -v * 0.5),
            y: useTransform(backgroundY, v => -v * 0.5),
          }}
          animate={{
            scale: [1.15, 1, 1.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03),transparent_60%)]" />

        {/* Additional gradient overlays for depth */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-red-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-orange-500/5 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Badge - 25% smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 w-fit"
            >
              <Gauge className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-medium text-gray-700">Premium Japanese Vehicles</span>
            </motion.div>

            {/* Headline - 25% smaller */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight text-gray-900"
              >
                Your Gateway to{' '}
                <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Premium Japanese
                </span>{' '}
                Cars
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base text-gray-600 max-w-lg leading-relaxed"
              >
                Discover Japan&apos;s finest vehicles, from legendary sports cars to
                luxury sedans. Direct export from verified dealers to your doorstep.
              </motion.p>
            </div>

            {/* Stats - 25% smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: '530+', label: 'Cars Exported' },
                { value: '20+', label: 'Verified Dealers' },
                { value: '10+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Bar - Enhanced shadow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative max-w-xl"
            >
              <div className={`
                relative flex items-center gap-2 bg-white rounded-2xl border transition-all duration-300
                ${isSearchFocused
                  ? 'border-red-500 shadow-2xl shadow-red-500/20 ring-2 ring-red-500/10'
                  : 'border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300'}
              `}>
                <Search className="w-4 h-4 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 bg-transparent py-3.5 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
                <Button className="mr-2 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-xl px-5 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons - 25% smaller with enhanced shadows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="default"
                className="bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-xl px-6 py-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Browse Inventory
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="default"
                variant="outline"
                className="rounded-xl px-5 py-2.5 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-200 group shadow-md hover:shadow-lg"
              >
                <Play className="w-3.5 h-3.5 mr-2 text-red-600 group-hover:text-red-700" />
                Watch How It Works
              </Button>
            </motion.div>

            {/* Trust Badges - 25% smaller */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-5 pt-3"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">Verified Dealers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-600">Global Shipping</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Floating Car Cards */}
          <div className="relative h-[450px] lg:h-[550px] hidden lg:block">
            {featuredCars.map((car, index) => (
              <FloatingCarCard key={car.id} car={car} index={index} />
            ))}

            {/* Decorative Elements with enhanced shadows */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-gray-300 rounded-full pointer-events-none shadow-inner"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-gray-200 rounded-full pointer-events-none"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-linear-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}