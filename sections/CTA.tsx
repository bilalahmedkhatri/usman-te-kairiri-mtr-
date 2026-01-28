import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red via-red to-orange" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full border border-white/10"
        />
      </div>

      <div className="w-full section-padding relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <FadeIn>
            <Badge className="bg-white/20 text-white border-0 mb-6">
              Get Started Today
            </Badge>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to find your{' '}
              <span className="text-white/80">dream JDM car</span>?
            </h2>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Subscribe to get exclusive access to new inventory, special offers, 
              and expert insights on Japanese car exports.
            </p>
          </FadeIn>

          {/* Email Form */}
          <FadeIn delay={0.3}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 py-6 rounded-xl border-0 text-foreground"
                  disabled={isSubmitted}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-white text-red hover:bg-white/90 font-semibold rounded-xl px-8 shadow-lg group"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </FadeIn>

          {/* Trust Text */}
          <FadeIn delay={0.4}>
            <p className="text-white/60 text-sm mt-4">
              Join 10,000+ car enthusiasts. Unsubscribe anytime.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}