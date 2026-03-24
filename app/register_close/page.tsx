'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Lock, Eye, EyeOff, UserPlus, ShieldCheck, Sparkles, CheckCircle,
  AlertCircle, Loader2, ArrowRight, Car, Key, MapPin, Phone
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionInput = motion.input;

// Beautiful vehicle images
const vehicleImages = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80',
  'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
];

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [bgImage, setBgImage] = useState('');

  // Random background image
  useEffect(() => {
    const randomImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
    setBgImage(randomImage);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    // Minimal validation
    const newErrors: typeof errors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Auto-detect site and register
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Site would be auto-detected here
      const registrationData = {
        ...formData,
        role: 'BUYER',
        created_at: new Date().toISOString(),
        // site_id would be auto-detected from domain
      };

      console.log('Registering user:', registrationData);
      setSuccessMessage('Account created successfully! Redirecting...');

      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch {
      setErrors({ email: 'Email already exists' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Vehicle Image (Desktop only) */}
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
              <ShieldCheck className="w-8 h-8" />
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Join Our Network</h2>
            <p className="text-lg mb-6">Access premium vehicles worldwide</p>
            <div className="flex items-center gap-2 text-sm">
              <Key className="w-4 h-4" />
              <span>Secure Registration</span>
              <span className="mx-2">•</span>
              <Car className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* Right side - Registration Form */}
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Start your vehicle export journey</p>
          </MotionDiv>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <MotionInput
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white`}
                  required
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </MotionDiv>

            {/* Email */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <MotionInput
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
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
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password *
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 8 characters for security
              </p>
            </MotionDiv>

            {/* Phone - Optional */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254712345678"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </MotionDiv>

            {/* Country - Optional */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="">Select Country</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Japan">Japan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </MotionDiv>

            {/* Success Message */}
            <AnimatePresence>
              {successMessage && (
                <MotionDiv
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{successMessage}</span>
                </MotionDiv>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <MotionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </MotionButton>

            {/* Login Link */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign in
                </Link>
              </p>
            </MotionDiv>
          </form>
        </div>
      </MotionDiv>
    </div>
  );
}