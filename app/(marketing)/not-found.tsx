"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Navigation, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] px-4 py-24 text-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-100/30 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-100/20 rounded-full blur-[80px] -z-10" />

      {/* Hero Visual */}
      <div className="relative mb-12">
        <h1 className="text-[12rem] font-black text-gray-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="w-24 h-24 text-red-600 animate-[spin_10s_linear_infinite]" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-6 max-w-xl relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Lost in <span className="text-red-600">Transit</span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The vehicle or information you&apos;re looking for seems to have changed lanes or taken an unexpected exit. Let&apos;s get you back on the right track.
        </p>
      </div>

      {/* Action Area */}
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <Link href="/">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-10 h-14 shadow-xl shadow-red-600/20 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
        <Link href="/inventory">
          <Button variant="outline" size="lg" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl px-10 h-14 shadow-sm">
            <Search className="w-4 h-4 mr-2" />
            Browse Inventory
          </Button>
        </Link>
      </div>

      {/* Helper Links */}
      <div className="mt-16 pt-8 border-t border-gray-100 w-full max-w-sm flex justify-center gap-8 text-sm font-medium text-gray-400">
        <Link href="/contact" className="hover:text-red-600 transition-colors">Support</Link>
        <Link href="/faq" className="hover:text-red-600 transition-colors">FAQs</Link>
        <Link href="/sitemap" className="hover:text-red-600 transition-colors">Sitemap</Link>
      </div>
    </div>
  );
}
