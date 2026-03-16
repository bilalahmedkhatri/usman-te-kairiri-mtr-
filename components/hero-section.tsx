"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative h-[700px] w-full overflow-hidden mb-16 rounded-3xl shadow-2xl mx-auto max-w-[1440px]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                style={{ backgroundImage: 'url("/hero-bg.png")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
                <div className="max-w-2xl pt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
                            ✨ Japan&apos;s Premium Export Service
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-[1.1]">
                            Exporting Excellence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Worldwide
                            </span>
                        </h1>

                        <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-lg">
                            Access exclusive Japanese auctions and premium inventory.
                            We handle inspection, logistics, and shipping to 50+ countries.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/inventory">
                                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                                    Browse Inventory <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 rounded-full backdrop-blur-sm transition-all">
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    How It Works
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white font-heading">50+</span>
                                <span className="text-slate-400 text-sm">Countries Served</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white font-heading">12k+</span>
                                <span className="text-slate-400 text-sm">Vehicles Shipped</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white font-heading">4.9/5</span>
                                <span className="text-slate-400 text-sm">Customer Rating</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
