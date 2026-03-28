"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Marketing Page Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-24 text-center">
      {/* Decorative Error Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8"
      >
        <AlertTriangle className="w-12 h-12 text-red-600" />
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 max-w-lg"
      >
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          System <span className="text-red-600">Interruption</span>
        </h2>
        <p className="text-gray-600 text-lg">
          We encountered an unexpected issue while loading this page. Our technical team has been notified.
        </p>

        {/* Error Detail Display (Formatted) */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-left overflow-hidden">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Error Diagnostic
          </div>
          <p className="text-sm font-mono text-gray-700 break-words leading-relaxed">
            {error.message || "Unknown Application Exception"}
          </p>
          {error.digest && (
            <p className="mt-2 text-[10px] text-gray-400 font-mono">
              Reference ID: {error.digest}
            </p>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-12"
      >
        <Button
          onClick={reset}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 shadow-xl shadow-red-600/20 group"
        >
          <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Attempt Recovery
        </Button>
        <Link href="/">
          <Button
            variant="ghost"
            size="lg"
            className="text-gray-600 hover:text-red-600 rounded-xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
            <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-sm text-gray-400"
      >
        If the problem persists, please contact our support desk.
      </motion.p>
    </div>
  );
}
