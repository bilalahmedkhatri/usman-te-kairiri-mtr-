import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Search, Gauge, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cars } from '@/data/cars';

interface FloatingCarCardProps {
  car: typeof cars[0];
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
      className={`absolute ${pos.size} hidden lg:block cursor-pointer`}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        top: pos.top, 
        right: pos.right, 
        bottom: pos.bottom 
      }}
    >
      <motion.div
        animate={{ 
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-2xl overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-sm font-medium truncate">{car.make} {car.model}</p>
            <p className="text-white/80 text-xs">{car.year}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
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
      className="relative min-h-screen w-full overflow-hidden pt-24 pb-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(0 72% 51% / 0.3) 0%, transparent 70%)',
            x: backgroundX,
            y: backgroundY,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(24 95% 53% / 0.3) 0%, transparent 70%)',
            x: useTransform(backgroundX, v => -v * 0.5),
            y: useTransform(backgroundY, v => -v * 0.5),
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 dark:bg-white/5 border border-border/50 w-fit"
            >
              <Gauge className="w-4 h-4 text-red" />
              <span className="text-sm font-medium">Premium Japanese Vehicles</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                Your Gateway to{' '}
                <span className="gradient-text">Premium</span>{' '}
                JDM Cars
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                Discover Japan's finest vehicles, from legendary sports cars to 
                luxury sedans. Direct export from verified dealers to your doorstep.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { value: '15,000+', label: 'Cars Exported' },
                { value: '500+', label: 'Verified Dealers' },
                { value: '50', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative max-w-xl"
            >
              <div className={`
                relative flex items-center gap-2 bg-card rounded-2xl border transition-all duration-300
                ${isSearchFocused ? 'border-red shadow-jdm' : 'border-border/50'}
              `}>
                <Search className="w-5 h-5 text-muted-foreground ml-4" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 bg-transparent py-4 pr-4 text-sm outline-none placeholder:text-muted-foreground"
                />
                <Button className="mr-2 bg-gradient-to-r from-red to-orange hover:from-red/90 hover:to-orange/90 text-white rounded-xl">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red to-orange hover:from-red/90 hover:to-orange/90 text-white font-semibold rounded-xl px-8 shadow-jdm hover:shadow-red/30 transition-all duration-300 group"
              >
                Browse Inventory
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-6 group border-border/50 hover:bg-secondary/50"
              >
                <Play className="w-4 h-4 mr-2 text-red" />
                Watch How It Works
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green" />
                <span className="text-sm text-muted-foreground">Verified Dealers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue" />
                <span className="text-sm text-muted-foreground">Global Shipping</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Floating Car Cards */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            {featuredCars.map((car, index) => (
              <FloatingCarCard key={car.id} car={car} index={index} />
            ))}

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-border/20 rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-border/10 rounded-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}