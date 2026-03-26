'use client';
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
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Quote Icon */}
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
          <Quote className="w-5 h-5 text-red-600" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
                }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          &quot;{testimonial.content}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
            <p className="text-xs text-gray-500">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>

        {/* Car Bought */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">Purchased:</p>
          <p className="text-xs font-medium text-gray-700">{testimonial.carBought}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />

      <div className="w-full section-padding relative">
        {/* Section Header - Centered */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-red-50 text-red-600 border-0 mb-4 hover:bg-red-100 inline-flex">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 text-gray-900">
            What Our <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
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