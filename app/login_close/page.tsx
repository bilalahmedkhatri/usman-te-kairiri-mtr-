'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowRight,
  Car, Ship, Key, ShieldCheck, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionInput = motion.input;

// Beautiful vehicle images from Unsplash
const vehicleImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80',
];

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false,
  });
  const [loginError, setLoginError] = useState('');
  const [bgImage, setBgImage] = useState('');

  // Random background image
  useEffect(() => {
    const randomImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
    setBgImage(randomImage);
  }, []);

  // Auto-detect site from domain/subdomain
  useEffect(() => {
    // In production, this would detect site from window.location.hostname
    // For demo, we'll set a default
    console.log('Site auto-detection active');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setLoginError('');

    // Validation
    const newErrors: typeof errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate login with auto-site detection
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Site auto-detection would happen here in real app
      // const currentSite = detectSiteFromDomain();

      console.log('Login successful');
      router.push('/dashboard');

    } catch {
      setLoginError('Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Vehicle Image */}
      <MotionDiv
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden"
      >
        <Image
          src={bgImage}
          alt="Premium Vehicle"
          fill
          className="object-cover"
          priority
        />
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-12"
        >
          <div className="text-white">
            <div className="flex items-center gap-3 mb-3">
              <Car className="w-8 h-8" />
              <Ship className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Premium Vehicles</h2>
            <p className="text-lg mb-6">International Export Platform</p>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Quality Assured</span>
              <span className="mx-2">•</span>
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Trading</span>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* Right side - Login Form */}
      <MotionDiv
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Key className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Access your vehicle export portal</p>
          </MotionDiv>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <MotionInput
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </MotionDiv>

            {/* Password */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <MotionInput
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                  required
                />
                <MotionButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </MotionButton>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </MotionDiv>

            {/* Remember Me */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.remember_me}
                  onChange={(e) => setFormData({ ...formData, remember_me: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remember me</span>
              </label>

              <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot password?
              </Link>
            </MotionDiv>

            {/* Error Message */}
            <AnimatePresence>
              {loginError && (
                <MotionDiv
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{loginError}</span>
                </MotionDiv>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </MotionButton>

            {/* Sign Up Link */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New to the platform?{' '}
                <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                  Create an account
                </Link>
              </p>
            </MotionDiv>
          </form>
        </div>
      </MotionDiv>
    </div>
  );
}