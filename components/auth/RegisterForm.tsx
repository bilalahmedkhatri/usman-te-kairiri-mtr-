'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, Globe } from 'lucide-react'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { registerAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const password = watch('password')

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <div className="glass rounded-2xl p-8 shadow-soft-xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold gradient-text mb-2">
                        Create Account
                    </h1>
                    <p className="text-muted-foreground">
                        Join us to start exploring premium vehicles
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                className="pl-10"
                                disabled={isLoading}
                                {...register('name')}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                disabled={isLoading}
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone Field (Optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                className="pl-10"
                                disabled={isLoading}
                                {...register('phone')}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Country Field (Optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="country">Country (Optional)</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="country"
                                type="text"
                                placeholder="United States"
                                className="pl-10"
                                disabled={isLoading}
                                {...register('country')}
                            />
                        </div>
                        {errors.country && (
                            <p className="text-sm text-red-500">{errors.country.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="space-y-1">
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
                                    <p className="text-xs text-muted-foreground">
                                        Password strength: {passwordStrength.label}
                                    </p>
                                )}
                            </div>
                        )}

                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                                {...register('confirmPassword')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>

                {/* Terms */}
                <p className="mt-4 text-xs text-center text-muted-foreground">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-red-500 hover:text-red-600">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-red-500 hover:text-red-600">
                        Privacy Policy
                    </Link>
                </p>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-semibold text-red-500 hover:text-red-600 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}
