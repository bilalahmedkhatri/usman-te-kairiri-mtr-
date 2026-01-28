'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, Users, Car, Anchor, DollarSign
} from 'lucide-react';

const shimmerVariants = {
  animate: {
    backgroundPosition: ['-200px 0', '200px 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export default function GlobalLoading() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <motion.div
          variants={shimmerVariants}
          animate="animate"
          className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200px 100%',
          }}
        />
        <motion.div
          variants={shimmerVariants}
          animate="animate"
          className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-64"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200px 100%',
          }}
        />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="animate"
            className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200px 100%',
            }}
          />
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="animate"
            className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200px 100%',
            }}
          />
        ))}
      </div>

      {/* Activity Skeleton */}
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          backgroundSize: '200px 100%',
        }}
      />
    </div>
  );
}