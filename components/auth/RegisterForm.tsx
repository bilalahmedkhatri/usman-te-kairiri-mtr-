'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, UserPlus, AlertCircle } from 'lucide-react'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { registerAction } from '@/app/actions/auth'
import { Logo } from '@/components/Logo'
import toast from 'react-hot-toast'

const MotionDiv = motion.div
const MotionInput = motion.input
const MotionButton = motion.button

// Beautiful vehicle images
const vehicleImages = [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80',
    'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
]

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [bgImage, setBgImage] = useState('')
    const [imageOnLeft, setImageOnLeft] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const password = watch('password')

    // Random background image and position
    useEffect(() => {
        const randomImage = vehicleImages[Math.floor(Math.random() * vehicleImages.length)]
        const randomPosition = Math.random() > 0.5
        setBgImage(randomImage)
        setImageOnLeft(randomPosition)
    }, [])

    // Password strength indicator
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { strength: 0, label: '', color: '' }

        let strength = 0
        if (pwd.length >= 8) strength++
        if (/[A-Z]/.test(pwd)) strength++
        if (/[a-z]/.test(pwd)) strength++
        if (/[0-9]/.test(pwd)) strength++
        if (/[^A-Za-z0-9]/.test(pwd)) strength++

        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
        const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600']

        return { strength, label: labels[strength], color: colors[strength] }
    }

    const passwordStrength = getPasswordStrength(password || '')

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true)

        try {
            const result = await registerAction(data)

            if (result?.error) {
                toast.error(result.error)
            } else {
                // Success is handled by server-side redirect (auto login)
                toast.success('Account created successfully!')
            }
        } catch (error) {
            console.error('Registration error:', error)
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const ImageSide = () => (
        <MotionDiv
            initial={{ opacity: 0, x: imageOnLeft ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
        >
            {bgImage && (
                <Image
                    src={bgImage}
                    alt="Premium Vehicle"
                    fill
                    className="object-cover"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

            <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
                {/* Logo at top */}
                <MotionDiv
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Logo variant="horizontal" theme="dark" />
                </MotionDiv>

                {/* Content at bottom */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white space-y-4"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="w-8 h-8" />
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-red-500">Join Our Network</h2>
                    <p className="text-lg text-white/90">Access premium vehicles worldwide</p>

                    <div className="flex items-center gap-6 text-sm pt-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secure Registration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            <span>Instant Access</span>
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </MotionDiv>
    )

    const FormSide = () => (
        <MotionDiv
            initial={{ opacity: 0, x: imageOnLeft ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-gray-50 dark:bg-gray-900"
        >
            <div className="w-full max-w-md">
                {/* Mobile Logo */}
                <div className="lg:hidden flex justify-center mb-8">
                    <Logo variant="stacked" />
                </div>

                {/* Header with Icon */}
                <MotionDiv
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start your vehicle export journey</p>
                </MotionDiv>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
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
                            <input
                                type="text"
                                placeholder="John Doe"
                                className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all`}
                                {...register('name')}
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
                                    {errors.name.message}
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </MotionDiv>

                    {/* Email Field */}
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
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all`}
                                {...register('email')}
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
                                    {errors.email.message}
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </MotionDiv>

                    {/* Password Field */}
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
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all`}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="space-y-1 mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full transition-colors ${level <= passwordStrength.strength
                                                ? passwordStrength.color
                                                : 'bg-gray-200 dark:bg-gray-700'
                                                }`}
                                        />
                                    ))}
                                </div>
                                {passwordStrength.label && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Password strength: {passwordStrength.label}
                                    </p>
                                )}
                            </div>
                        )}

                        <AnimatePresence>
                            {errors.password && (
                                <MotionDiv
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-1 mt-2 text-sm text-red-600"
                                >
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.password.message}
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Minimum 8 characters for security
                        </p>
                    </MotionDiv>

                    {/* Submit Button */}
                    <MotionButton
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg mt-6"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </MotionButton>

                    {/* Terms */}
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-red-500 hover:text-red-600 font-medium">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-red-500 hover:text-red-600 font-medium">
                            Privacy Policy
                        </Link>
                    </p>

                    {/* Login Link */}
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-6"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-red-500 hover:text-red-600 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </MotionDiv>
                </form>
            </div>
        </MotionDiv>
    )

    return (
        <div className="min-h-screen flex">
            {imageOnLeft ? (
                <>
                    <ImageSide />
                    <FormSide />
                </>
            ) : (
                <>
                    <FormSide />
                    <ImageSide />
                </>
            )}
        </div>
    )
}
