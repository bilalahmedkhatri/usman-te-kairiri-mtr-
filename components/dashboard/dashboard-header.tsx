"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { JapanTime } from "@/components/japan-time";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-4 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo (left) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="flex items-center gap-3"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Cars International</span>
            </Link>
          </motion.div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + 0.2 + 0.4, duration: 0.4 }}
              className="hidden md:flex items-center gap-4"
            >
              <JapanTime />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + 0.2 + 0.4 + 0.5, duration: 0.4 }}
              className="flex items-center"
            >
              <Button asChild variant="default" size="sm" className="focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2">
                <Link href="/signout">Sign out</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}