"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, FileText, Shield, XCircle, CreditCard, Truck, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const faqCategories = [
  {
    title: "Shipping & Delivery",
    icon: Truck,
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Shipping times vary by destination. Generally:\n• Asia: 2-4 weeks\n• North America: 4-6 weeks\n• Europe: 6-8 weeks\n• Australia/New Zealand: 3-5 weeks\n• Africa: 5-7 weeks\n• Middle East: 4-6 weeks\n\nActual delivery times depend on vessel schedules, port congestion, and customs clearance in your country."
      },
      {
        question: "What are the shipping options available?",
        answer: "We offer two main shipping methods:\n\n• Ro-Ro (Roll-on/Roll-off): Most cost-effective option where vehicles are driven onto the vessel. Ideal for standard vehicles.\n\n• Container Shipping: Your vehicle is securely loaded into a 20ft or 40ft container. Recommended for luxury, classic, or high-value vehicles.\n\nWe'll recommend the best option based on your vehicle type and destination."
      },
      {
        question: "Can I track my shipment?",
        answer: "Yes! Once your vehicle is loaded and the vessel departs, we provide you with a unique tracking number. You can monitor your shipment's progress in real-time through our tracking portal or directly with the shipping line's website."
      },
      {
        question: "What happens if my shipment is delayed?",
        answer: "While we strive for timely deliveries, delays can occur due to weather, port congestion, or customs procedures. Our team monitors all shipments closely and keeps you informed of any changes. We'll work with the shipping line to minimize delays and provide updated arrival estimates."
      }
    ]
  },
  {
    title: "Documentation & Process",
    icon: FileText,
    faqs: [
      {
        question: "What documents will I receive?",
        answer: "We send the following original documents via DHL/FedEx courier:\n\n• Bill of Lading (B/L) - The title document for your vehicle\n• Export Certificate (Deregistration Paper) - Proof of legal export from Japan\n• Commercial Invoice - For customs valuation\n• Packing List - Detailed shipment contents\n• Insurance Certificate - Proof of marine insurance coverage\n\nThese documents are essential for customs clearance in your country."
      },
      {
        question: "How does the import process work?",
        answer: "The complete import process involves:\n\n1. Vehicle Selection - Choose your vehicle from our inventory\n2. Order Confirmation - Receive Pro forma Invoice\n3. Payment - Secure bank transfer to our Japanese account\n4. Export Preparation - Vehicle inspection and documentation\n5. Shipping - Book vessel and load vehicle\n6. Document Dispatch - Courier shipping documents\n7. Customs Clearance - Clear vehicle at your destination port\n8. Delivery - Take delivery of your vehicle\n\nOur team guides you through each step."
      },
      {
        question: "Do I need an import license?",
        answer: "Import requirements vary by country. Many countries allow individuals to import vehicles without a license, provided it's for personal use. We recommend checking with your local customs authority for specific requirements. Our team can provide guidance based on your location."
      },
      {
        question: "How do I clear customs in my country?",
        answer: "Customs clearance typically involves:\n\n1. Submit the Bill of Lading to your shipping agent\n2. Pay import duties and taxes based on vehicle value\n3. Present the Export Certificate and Commercial Invoice\n4. Arrange vehicle inspection (if required)\n5. Collect your vehicle from the port\n\nWe provide detailed guidance and can connect you with local customs brokers if needed."
      }
    ]
  },
  {
    title: "Payments & Pricing",
    icon: CreditCard,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept the following secure payment methods:\n\n• Telegraphic Transfer (T/T) / Bank Wire Transfer - Our primary method, directly to our Japanese bank account\n• Letter of Credit (L/C) - Available for bulk orders or upon request\n\nAll payments are processed securely, and we provide a detailed breakdown of all costs before payment."
      },
      {
        question: "What costs should I expect?",
        answer: "Your total cost includes:\n\n• Vehicle purchase price\n• Shipping freight charges\n• Marine insurance\n• Export documentation fees\n• Port handling charges in Japan\n\nAdditional costs you'll pay locally:\n• Import duties and taxes\n• Customs clearance fees\n• Local transportation\n\nWe provide a transparent, itemized quote before you commit."
      },
      {
        question: "Is there a deposit required?",
        answer: "For standard orders, full payment is typically required before shipping. For special orders or high-value vehicles, a 20-30% deposit may be required to secure the vehicle, with the balance due before vessel departure. Contact our sales team for specific arrangements."
      },
      {
        question: "What if the vehicle doesn't match the description?",
        answer: "We take vehicle condition seriously. Every vehicle comes with a comprehensive inspection report from Japan's auction houses or our own inspections. If a vehicle arrives and there's a significant discrepancy from the description, we work with you to resolve the issue. We've built our reputation on honest and transparent dealings."
      }
    ]
  },
  {
    title: "Vehicles & Inspections",
    icon: Search,
    faqs: [
      {
        question: "Are your vehicles inspected?",
        answer: "Yes! All vehicles come with a detailed inspection sheet from Japan's reputable auction houses (USS, TAA, JU, etc.). These reports include:\n\n• Exterior condition with photos\n• Interior condition\n• Mechanical condition\n• Odometer reading\n• Accident history\n• Maintenance records\n\nFor additional peace of mind, we can arrange third-party inspections upon request."
      },
      {
        question: "What is the auction grade system?",
        answer: "Japan uses a standardized grading system for vehicles at auction:\n\n• Grade S - Brand new / like new condition\n• Grade 4 - Excellent condition, well-maintained\n• Grade 3.5 - Good condition, normal wear\n• Grade 3 - Average condition\n• Grade 2 - Below average, some damage\n• Grade 1 - Poor condition\n• RA/R - Repaired or accident history\n\nWe typically recommend Grade 3.5 or higher for quality vehicles."
      },
      {
        question: "Can I request specific vehicles?",
        answer: "Absolutely! If you're looking for a specific make, model, or specification not currently in our inventory, we can search Japan's auction network for you. Our team will monitor auctions and notify you when your desired vehicle becomes available. This personalized service ensures you find exactly what you're looking for."
      },
      {
        question: "What warranty do you offer?",
        answer: "As a vehicle exporter, we don't provide traditional warranties. However, we guarantee:\n\n• Accurate vehicle condition as per inspection reports\n• Clear title and ownership\n• Legal export from Japan\n• Safe delivery to your port\n\nWe recommend having a local mechanic inspect your vehicle upon arrival. For added protection, third-party warranty options may be available depending on your location."
      }
    ]
  },
  {
    title: "General Questions",
    icon: Globe,
    faqs: [
      {
        question: "Do you ship worldwide?",
        answer: "Yes! We export vehicles to over 50 countries worldwide, including:\n\n• North America: USA, Canada, Mexico\n• Europe: UK, Germany, France, Netherlands, etc.\n• Africa: Kenya, Nigeria, South Africa, Tanzania, Uganda\n• Asia: Singapore, Malaysia, Thailand, Philippines\n• Oceania: Australia, New Zealand, Fiji\n• Caribbean & South America\n\nIf your country isn't listed, contact us—we can likely still arrange shipping."
      },
      {
        question: "How do I know if a vehicle is right-hand or left-hand drive?",
        answer: "All vehicles from Japan are right-hand drive (RHD). If you need a left-hand drive vehicle, we can source from other markets or help you understand your country's regulations regarding RHD imports. Many countries allow RHD vehicles, but always check your local requirements first."
      },
      {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled prior to shipment booking, subject to a cancellation fee to cover administrative costs (typically 5-10% of the vehicle price). Once the vessel is booked and the vehicle is loaded, cancellation is more complex and may incur higher costs. We always confirm shipping arrangements with you before proceeding."
      },
      {
        question: "How long has your company been in business?",
        answer: "TE KAIRIRI MOTORS has been serving customers since 1994, with over 30 years of experience in Japanese vehicle exports. We've built lasting relationships with dealers, auction houses, and shipping lines across Japan, ensuring reliable service for our global customers."
      }
    ]
  }
];

export default function FAQPage() {
  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(category =>
      category.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
                Got Questions? We've Got Answers
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about importing vehicles from Japan. Find answers to common questions about our process, shipping, documentation, and more.
            </p>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container mx-auto px-4 py-12"
        >
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {faqCategories.map((category) => (
              <motion.a
                key={category.title}
                href={`#${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                variants={fadeIn}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-gray-200"
              >
                {category.title}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="container mx-auto px-4 py-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              id={category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                {category.faqs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    variants={fadeIn}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`${categoryIndex}-${index}`} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                          <span className="font-semibold text-gray-900">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gradient-to-r from-red-600 to-orange-500 py-16 mt-8"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you with any additional questions about importing your dream Japanese vehicle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/inventory">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-xl px-8 py-3 text-lg font-semibold transition-all duration-300"
                >
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}