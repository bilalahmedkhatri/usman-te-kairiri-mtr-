"use client";

import { motion } from "framer-motion";
import { Search, CreditCard, Ship, CheckCircle, FileText, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Find Your Vehicle",
    description: "Browse our extensive inventory of over 10,000 vehicles. Use our detailed filters to find exactly what you're looking for by make, model, year, and price. Our team can also assist you in finding specific vehicles from Japan's top auctions.",
    details: ["Search by make, model, year, price", "Filter by mileage, transmission, color", "Detailed vehicle inspection reports available"]
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Order & Payment",
    description: "Submit your order or inquiry. We will send you a Pro forma Invoice with complete cost breakdown including vehicle price, shipping, and insurance. Complete the payment via Telegraphic Transfer (T/T) to our bank account in Japan.",
    details: ["Receive Pro forma Invoice", "Secure payment via bank transfer", "Full cost transparency with no hidden fees"]
  },
  {
    id: 3,
    icon: Ship,
    title: "Shipment Booking",
    description: "Once payment is confirmed, we book the earliest available vessel to your destination port. We handle all export documentation, customs clearance in Japan, and provide you with tracking information for your shipment.",
    details: ["Ro-Ro or Container shipping options", "Real-time vessel tracking", "Full export documentation included"]
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Receive Documents & Vehicle",
    description: "We dispatch all necessary documents via DHL/FedEx, including Bill of Lading, Export Certificate, and Commercial Invoice. Once the vehicle arrives at your port, you can clear customs and take delivery of your dream Japanese car.",
    details: ["Express courier document delivery", "Import customs support", "Complete after-sales assistance"]
  }
];

const additionalInfo = [
  {
    icon: Clock,
    title: "Shipping Time",
    description: "Typical shipping times: 2-4 weeks to Asia, 4-6 weeks to North America, 6-8 weeks to Europe"
  },
  {
    icon: FileText,
    title: "Required Documents",
    description: "Bill of Lading, Export Certificate, Commercial Invoice, Insurance Certificate, and Certificate of Origin"
  },
  {
    icon: Shield,
    title: "Import Support",
    description: "We provide guidance on import regulations and customs clearance in your country"
  }
];

export default function HowToBuyPage() {
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
              Simple 4-Step Process
            </Badge>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Buy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your simple 4-step guide to importing a vehicle from Japan. We make the process transparent, efficient, and hassle-free.
          </p>
        </div>
      </motion.div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className={`flex flex-col ${index % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                    <span className="text-red-600 font-bold text-lg mb-2">Step 0{step.id}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 max-w-md">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm text-gray-500 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-20 w-px h-24 bg-gray-200 -translate-x-1/2" />
                  )}
                </div>

                {/* Empty spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="bg-gray-50 py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Important Information
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {additionalInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={fadeIn}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Preview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What payment methods do you accept?",
                a: "We accept Telegraphic Transfer (T/T) bank transfers to our account in Japan. All payments are processed securely with full transparency."
              },
              {
                q: "How long does shipping take?",
                a: "Shipping times vary by destination: 2-4 weeks to Asia, 4-6 weeks to North America, and 6-8 weeks to Europe. We'll provide tracking information once the vessel departs."
              },
              {
                q: "Do you handle customs clearance?",
                a: "We handle all export documentation from Japan. For import customs in your country, we provide guidance and all necessary documents to help you clear your vehicle smoothly."
              },
              {
                q: "Can I get a vehicle inspection?",
                a: "Yes! Every vehicle comes with a detailed inspection report. We can also arrange for third-party inspections upon request for added peace of mind."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Browse our extensive inventory of premium Japanese vehicles and find your dream car today.
          </p>
          <Link href="/inventory">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Browsing Now
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}