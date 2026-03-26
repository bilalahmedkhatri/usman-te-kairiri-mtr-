'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArrowRight, Mail, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would make your actual API call
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // if (!response.ok) throw new Error('Subscription failed');

      setIsSubmitted(true);
      setShowSuccessToast(true);

      // Hide success toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismissError = () => {
    setError('');
  };

  const handleDismissToast = () => {
    setShowSuccessToast(false);
  };

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-orange-600" />

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

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-auto min-w-[300px] max-w-md"
        >
          <div className="bg-green-500 text-white rounded-lg shadow-xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Successfully subscribed! Check your email for confirmation.</p>
            <button
              onClick={handleDismissToast}
              className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="w-full section-padding relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <FadeIn>
            <Badge className="bg-white/20 text-white border-0 mb-4 hover:bg-white/30 inline-flex">
              Get Started Today
            </Badge>
          </FadeIn>

          {/* Headline - 25% smaller */}
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 text-white">
              Ready to find your{' '}
              <span className="bg-linear-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Dream Japanese
              </span>{' '}
              car?
            </h2>
          </FadeIn>

          {/* Description - 25% smaller */}
          <FadeIn delay={0.2}>
            <p className="text-base text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to get exclusive access to new inventory, special offers,
              and expert insights on Japanese car exports.
            </p>
          </FadeIn>

          {/* Email Form with Error Handling */}
          <FadeIn delay={0.3}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`pl-11 py-3 rounded-xl border-0 bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 transition-all duration-200 ${error ? 'ring-2 ring-red-300' : ''
                      }`}
                    disabled={isSubmitting || isSubmitted}
                  />
                </div>
                <Button
                  type="submit"
                  size="default"
                  className="bg-white text-red-600 hover:bg-white/90 font-semibold rounded-xl px-6 py-3 shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-2 bg-red-500/20 backdrop-blur-sm rounded-lg p-3 text-sm text-white"
                >
                  <span>{error}</span>
                  <button
                    type="button"
                    onClick={handleDismissError}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </form>
          </FadeIn>

          {/* Trust Text - 25% smaller */}
          <FadeIn delay={0.4}>
            <p className="text-white/70 text-xs mt-4">
              Join 1,000+ car enthusiasts. Unsubscribe anytime.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}