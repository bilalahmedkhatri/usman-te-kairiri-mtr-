"use client";
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function AuthLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                >
                    <Loader2 className="w-12 h-12 text-red-500" />
                </motion.div>
                <p className="mt-4 text-muted-foreground">Loading...</p>
            </motion.div>
        </div>
    )
}
