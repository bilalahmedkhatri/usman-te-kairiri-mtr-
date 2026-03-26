"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Trophy, Target, Globe, Clock, Award, HeartHandshake } from "lucide-react";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-br from-red-50 via-orange-50 to-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Badge className="bg-red-100 text-red-600 border-0 px-4 py-2 text-sm font-semibold">
              Excellence Since 1994
            </Badge>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About TE KAIRIRI MOTORS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We bridge the gap between premium Japanese vehicles and the world, built on three decades of trust, excellence, and unwavering commitment to quality.
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide the most transparent, efficient, and reliable vehicle export service from Japan to the world. We strive to remove the complexities of international trade, making it as easy as buying from a local dealer. Every vehicle we export carries our promise of quality and authenticity.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the global standard for cross-border vehicle trade, recognized for our unwavering commitment to quality, integrity, and customer satisfaction. We envision a world where finding your dream Japanese vehicle is effortless and trustworthy.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Years of Excellence", value: "30+", icon: Clock },
              { label: "Vehicles Exported", value: "12,000+", icon: Globe },
              { label: "Countries Served", value: "50+", icon: Award },
              { label: "Satisfied Customers", value: "8,500+", icon: Users },
            ].map((stat) => (
              <motion.div variants={fadeIn} key={stat.label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
            <p className="leading-relaxed">
              Founded in 1994, TE KAIRIRI MOTORS began with a simple mission: to share Japan's automotive excellence with the world. What started as a small family business has grown into a trusted global exporter, serving customers across five continents.
            </p>
            <p className="leading-relaxed">
              Our journey has been defined by our deep understanding of Japanese vehicles and our commitment to authentic, transparent transactions. We've built relationships with the most reputable dealers and auction houses across Japan, ensuring our customers get access to the finest vehicles on the market.
            </p>
            <p className="leading-relaxed">
              Today, we're proud to be recognized as a leader in Japanese vehicle exports, known for our meticulous vehicle inspections, comprehensive export services, and unwavering dedication to customer success.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="bg-gray-50 py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Integrity",
                desc: "We believe in total transparency. Detailed vehicle reports, honest assessments, and absolutely no hidden fees. What you see is what you get.",
                color: "red"
              },
              {
                icon: HeartHandshake,
                title: "Customer First",
                desc: "Your satisfaction is our success metric. Our dedicated support team guides you through every step, from selection to shipping and delivery.",
                color: "orange"
              },
              {
                icon: Trophy,
                title: "Quality Excellence",
                desc: "We only source vehicles that meet our strict quality standards. Every car undergoes rigorous inspection before it's offered to our customers.",
                color: "amber"
              }
            ].map((item) => (
              <motion.div key={item.title} variants={fadeIn}>
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className={`w-16 h-16 bg-${item.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose TE KAIRIRI MOTORS?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Direct Access to Japan's Best Auctions",
                desc: "We have exclusive access to Japan's premier vehicle auctions, giving you the widest selection of high-quality vehicles."
              },
              {
                title: "Comprehensive Vehicle Inspections",
                desc: "Every vehicle undergoes our multi-point inspection process, ensuring you receive exactly what you expect."
              },
              {
                title: "Transparent Pricing & Process",
                desc: "No hidden costs, no surprises. We provide complete breakdowns of all costs before you commit to a purchase."
              },
              {
                title: "End-to-End Export Services",
                desc: "From documentation to shipping, we handle everything. Your vehicle arrives safely at your preferred port."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mt-1">
                  <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-r from-red-600 to-orange-500 py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Japanese Car?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trusted us with their vehicle export journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Browse Inventory
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper Badge component
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}