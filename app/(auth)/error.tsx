'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthLayout from '@/components/auth/AuthLayout'

export default function AuthError() {
    return (
        <AuthLayout showBackButton={false}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-8 shadow-soft-xl text-center"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6"
                >
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </motion.div>

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Authentication Error
                </h1>
                <p className="text-muted-foreground mb-6">
                    We encountered an issue while trying to sign you in.
                    Please try again or contact support if the problem persists.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        asChild
                        variant="outline"
                        className="gap-2"
                    >
                        <Link href="/login">
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Help Text */}
                <p className="mt-6 text-sm text-muted-foreground">
                    Need help?{' '}
                    <Link href="/contact" className="text-red-500 hover:text-red-600">
                        Contact Support
                    </Link>
                </p>
            </motion.div>
        </AuthLayout>
    )
}
