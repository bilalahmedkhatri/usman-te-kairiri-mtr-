'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface AuthLayoutProps {
    children: React.ReactNode
    showBackButton?: boolean
}

export default function AuthLayout({ children, showBackButton = true }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-red-500/5 dark:to-red-500/10" />

            {/* Animated Circles */}
            <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Back Button */}
                {showBackButton && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to home
                        </Link>
                    </motion.div>
                )}

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <Link href="/" className="inline-block">
                        <h2 className="text-2xl font-bold gradient-text">
                            Hokira International
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Premium Vehicle Exports
                        </p>
                    </Link>
                </motion.div>

                {/* Form Content */}
                {children}

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 text-center text-xs text-muted-foreground"
                >
                    <p>© 2024 Hokira International. All rights reserved.</p>
                </motion.div>
            </div>
        </div>
    )
}
