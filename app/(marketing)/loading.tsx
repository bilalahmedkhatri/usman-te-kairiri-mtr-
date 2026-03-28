// app/(marketing)/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-24 space-y-8 animate-pulse">
      {/* Brand Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-red-600 border-r-orange-500 rounded-full animate-spin shadow-lg" />
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          Preparing the Best Selection
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          We&apos;re gathering the latest inventory and premium deals just for you...
        </p>
      </div>

      {/* Optional: Minimal Skeleton for sections */}
      <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 opacity-40">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse shadow-sm" />
        ))}
      </div>
    </div>
  );
}
