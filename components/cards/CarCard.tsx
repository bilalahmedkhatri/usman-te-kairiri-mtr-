import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ShoppingCart, ArrowRight, Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/hooks/useStore';
import type { Car } from '@/types';

interface CarCardProps {
  car: Car;
  index?: number;
  variant?: 'default' | 'compact' | 'horizontal' | 'featured';
  showActions?: boolean;
}

export function CarCard({ 
  car, 
  index = 0, 
  variant = 'default',
  showActions = true 
}: CarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart, isInCart } = useStore();
  
  const isWishlisted = isInWishlist(car.id);
  const isInCartList = isInCart(car.id);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(mileage);
  };

  if (variant === 'horizontal') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group"
      >
        <motion.div
          animate={{ y: isHovered ? -6 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 bg-card rounded-2xl overflow-hidden border border-border/30 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
        >
          {/* Image */}
          <div className="relative w-48 h-36 flex-shrink-0 overflow-hidden">
            <motion.img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />
            {car.badge && (
              <Badge className="absolute top-2 left-2 bg-red text-white border-0 text-xs">
                {car.badge}
              </Badge>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">{car.year}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatMileage(car.mileage)} km</span>
            </div>
            <h3 className="font-bold text-lg group-hover:text-red transition-colors">
              {car.make} {car.model}
            </h3>
            <p className="text-2xl font-bold text-red mt-1">{formatPrice(car.price)}</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{car.rating}</span>
              <span className="text-sm text-muted-foreground">({car.reviews})</span>
            </div>
          </div>
          
          {/* Actions */}
          {showActions && (
            <div className="flex flex-col justify-center p-4 gap-2">
              <Button size="sm" className="bg-red hover:bg-red/90 text-white rounded-lg">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Inquire
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleWishlist(car.id)}
                className={isWishlisted ? 'bg-red/10 border-red text-red' : ''}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red' : ''}`} />
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group"
      >
        <motion.div
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl overflow-hidden border border-border/30 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5 }}
            />
            {car.badge && (
              <Badge className="absolute top-2 left-2 bg-red text-white border-0 text-xs">
                {car.badge}
              </Badge>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(car.id)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm transition-colors"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
            </motion.button>
          </div>
          
          {/* Content */}
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{car.rating}</span>
              <span className="text-xs text-muted-foreground">({car.reviews})</span>
            </div>
            <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-red transition-colors">
              {car.make} {car.model}
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-red">{formatPrice(car.price)}</span>
              {car.originalPrice && (
                <Badge className="bg-green/20 text-green-dark text-[10px] border-0">
                  SALE
                </Badge>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
        animate={{ 
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-card rounded-2xl overflow-hidden border border-border/30 shadow-soft hover:shadow-soft-xl transition-shadow duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {car.badge && (
              <Badge className="bg-red text-white border-0">
                {car.badge}
              </Badge>
            )}
            {car.condition === 'Certified Pre-Owned' && (
              <Badge className="bg-green text-white border-0">
                <Check className="w-3 h-3 mr-1" />
                Certified
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWishlist(car.id)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </motion.button>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Button
              size="sm"
              className="flex-1 bg-white/90 hover:bg-white text-foreground rounded-lg"
              onClick={() => addToCart(car.id)}
              disabled={isInCartList}
            >
              {isInCartList ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  In Inquiry
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Inquire
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 hover:bg-white rounded-lg px-3"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Make & Model */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">{car.year}</Badge>
            <span className="text-xs text-muted-foreground">{car.transmission}</span>
          </div>
          
          <h3 className="text-xl font-bold group-hover:text-red transition-colors">
            {car.make} {car.model}
          </h3>
          
          {/* Specs */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{car.engine}</span>
            <span>•</span>
            <span>{formatMileage(car.mileage)} km</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({car.reviews})</span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red">{formatPrice(car.price)}</span>
              {car.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(car.originalPrice)}
                </span>
              )}
            </div>
            {car.originalPrice && (
              <Badge className="bg-green text-white border-0">
                Save {formatPrice(car.originalPrice - car.price)}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}