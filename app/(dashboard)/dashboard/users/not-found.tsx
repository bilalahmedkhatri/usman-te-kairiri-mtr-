'use client';

import { motion } from 'framer-motion';
import { UserX, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserX className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">User Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The user management page you're looking for doesn't exist or you don't have access to it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/users">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Users
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}