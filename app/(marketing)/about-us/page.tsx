"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Trophy, Target } from "lucide-react";

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
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About TE KAIRIRI MOTORS</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We bridge the gap between premium Japanese vehicles and the world, built on three decades of trust and excellence.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid md:grid-cols-2 gap-12 mb-20"
      >
        <motion.div variants={fadeIn} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-10">
          <Target className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To provide the most transparent, efficient, and reliable vehicle export service from Japan to the world. We strive to remove the complexities of international trade, making it as easy as buying from a local dealer.
          </p>
        </motion.div>
        <motion.div variants={fadeIn} className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-10">
          <Trophy className="w-12 h-12 text-blue-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            To become the global standard for cross-border vehicle trade, recognized for our unwavering commitment to quality, integrity, and customer satisfaction.
          </p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
      >
        {[
          { label: "Years Experience", value: "30+" },
          { label: "Vehicles Exported", value: "12,000+" },
          { label: "Countries Served", value: "50+" },
          { label: "Team Members", value: "45" },
        ].map((stat) => (
          <motion.div variants={fadeIn} key={stat.label} className="text-center">
            <div className="text-4xl font-bold text-primary font-heading mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Why Us */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Integrity",
              desc: "We believe in total transparency. Detailed reports, honest assessments, and no hidden fees."
            },
            {
              icon: Users,
              title: "Customer First",
              desc: "Your satisfaction is our metric. Our dedicated support team is with you at every step."
            },
            {
              icon: Trophy,
              title: "Quality",
              desc: "We only source vehicles that meet our strict standards. If we wouldn't drive it, we won't sell it."
            }
          ].map((item) => (
            <Card key={item.title} className="text-center border-none shadow-lg bg-white dark:bg-slate-900">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
