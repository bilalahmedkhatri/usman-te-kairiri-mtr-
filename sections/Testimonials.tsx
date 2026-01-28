import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { testimonials } from '@/data/cars';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-card rounded-2xl p-6 border border-border/30 shadow-soft hover:shadow-soft-lg transition-all duration-300"
      >
        {/* Quote Icon */}
        <div className="w-10 h-10 rounded-xl bg-red/10 flex items-center justify-center mb-4">
          <Quote className="w-5 h-5 text-red" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red to-orange flex items-center justify-center text-white font-bold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>

        {/* Car Bought */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">Purchased:</p>
          <p className="text-sm font-medium">{testimonial.carBought}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="w-full section-padding relative">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-green/20 text-green-dark border-0 mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied customers who found their dream 
            Japanese vehicle through our platform.
          </p>
        </FadeIn>

        {/* Testimonials Grid */}
        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}