"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Ship,
  XCircle,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  DollarSign,
  Truck,
  Scale
} from "lucide-react";
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

const sections = [
  {
    id: "payment-terms",
    icon: CreditCard,
    title: "Payment Terms",
    color: "red",
    content: {
      overview: "Payment for all vehicles must be made in full within 5 business days of the invoice date. We accept payments via Telegraphic Transfer (T/T) to our designated bank account in Japan. Please ensure that all bank charges are paid by the sender.",
      details: [
        "All payments must be in USD or JPY currency",
        "Bank transfer fees are the responsibility of the buyer",
        "We do not accept cash, checks, or credit cards",
        "Payment confirmation typically takes 2-3 business days",
        "Pro forma invoice is valid for 7 days from issue date"
      ],
      bankDetails: {
        bankName: "Sumitomo Mitsui Banking Corporation",
        branch: "Yokohama Branch",
        accountName: "TE KAIRIRI MOTORS Co., Ltd.",
        accountNumber: "1234567890",
        swiftCode: "SMBCJPJT",
        address: "2-1-1 Minato Mirai, Nishi-ku, Yokohama 220-0001, Japan"
      }
    }
  },
  {
    id: "shipping-terms",
    icon: Ship,
    title: "Shipping Terms",
    color: "blue",
    content: {
      overview: "All vehicle prices are typically quoted as FOB (Free on Board) Yokohama/Nagoya port. Shipping charges (freight) and insurance (if CIF) are calculated separately based on the destination port and vehicle dimensions. The vehicle will only be shipped once the full payment (Vehicle Cost + Freight) is received.",
      details: [
        "FOB: Buyer arranges shipping from Japanese port",
        "CNF/CIF: We arrange shipping to your destination port",
        "Shipping options: Ro-Ro (most cost-effective) or Container (for high-value vehicles)",
        "Marine insurance is recommended and available upon request",
        "We provide tracking information once vessel departs"
      ],
      shippingTimes: [
        { region: "Asia", time: "2-4 weeks" },
        { region: "North America", time: "4-6 weeks" },
        { region: "Europe", time: "6-8 weeks" },
        { region: "Australia/New Zealand", time: "3-5 weeks" },
        { region: "Africa", time: "5-7 weeks" },
        { region: "Middle East", time: "4-6 weeks" }
      ]
    }
  },
  {
    id: "cancellation-policy",
    icon: XCircle,
    title: "Cancellation Policy",
    color: "orange",
    content: {
      overview: "We understand that circumstances can change. Our cancellation policy is designed to be fair while covering administrative and logistical costs incurred.",
      details: [
        "Before payment: No cancellation fee, order simply expires",
        "After payment, before shipping booking: 50,000 JPY or 10% of invoice (whichever is higher)",
        "After shipping booking, before vessel departure: 30% of invoice value",
        "After vessel departure: No cancellation possible, full invoice amount due",
        "Special order vehicles: 30% non-refundable deposit required"
      ],
      exceptions: [
        "If we fail to deliver the vehicle as described, full refund available",
        "If shipping cannot be arranged within 60 days, full refund available",
        "Force majeure events will be handled on a case-by-case basis"
      ]
    }
  },
  {
    id: "warranty-claims",
    icon: Shield,
    title: "Warranty & Claims",
    color: "green",
    content: {
      overview: "Vehicles are sold 'as is' based on Japanese auction inspection reports. While we provide accurate inspection sheets, we do not offer warranties on used vehicles exported outside of Japan.",
      details: [
        "All vehicles come with detailed inspection sheets from Japan's auction houses",
        "Pre-export inspection available for additional peace of mind",
        "Claims must be filed within 7 days of vehicle arrival",
        "Independent survey report required for all claims",
        "Maximum claim amount limited to 50% of vehicle purchase price"
      ],
      process: [
        "Notify us immediately upon discovering discrepancy",
        "Provide photos and documentation of the issue",
        "Obtain independent inspection report",
        "We review and verify against original inspection",
        "Resolution determined based on findings"
      ]
    }
  },
  {
    id: "documentation",
    icon: FileText,
    title: "Documentation & Customs",
    color: "purple",
    content: {
      overview: "We provide all necessary documentation for smooth customs clearance in your country. Our team ensures all export paperwork is properly completed and dispatched promptly.",
      documents: [
        "Bill of Lading (B/L) - Original required for customs clearance",
        "Export Certificate (Deregistration Certificate) - Proof of legal export from Japan",
        "Commercial Invoice - Detailed vehicle value and transaction details",
        "Packing List - Vehicle specifications and container details",
        "Certificate of Origin - For duty calculations",
        "Inspection Certificate - Vehicle condition report"
      ],
      customsNotes: [
        "Import duties and taxes are buyer's responsibility",
        "Check your country's vehicle import regulations before purchasing",
        "We provide customs clearance guidance but do not handle local clearance",
        "Some countries require additional documentation for RHD vehicles"
      ]
    }
  },
  {
    id: "dispute-resolution",
    icon: Scale,
    title: "Dispute Resolution",
    color: "gray",
    content: {
      overview: "We strive to resolve any issues amicably and professionally. Our goal is your complete satisfaction with the vehicle import process.",
      details: [
        "All disputes will first be addressed through direct communication",
        "If unresolved, mediation through Japan Commercial Arbitration Association (JCAA)",
        "Governing law: Japanese law",
        "Jurisdiction: Tokyo District Court, Japan",
        "Both parties agree to act in good faith to resolve disputes"
      ],
      contact: "For any concerns, please contact our customer service team immediately at support@carsinternational.com"
    }
  }
];

export default function TermsPaymentPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms & Payment - TE KAIRIRI MOTORS",
    "description": "Terms of service and payment information for importing Japanese vehicles from TE KAIRIRI MOTORS. Read our payment terms, shipping policy, cancellation policy, and warranty information.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": sections.map((section, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": section.title,
        "description": section.content.overview
      }))
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
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
                Important Information
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms & Payment
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read our terms of service and payment information carefully before making a purchase.
              Understanding these terms ensures a smooth and transparent transaction.
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
            {sections.map((section) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                variants={fadeIn}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-gray-200"
              >
                {section.title}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-${section.color}-50 rounded-xl flex items-center justify-center`}>
                    <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {/* Overview */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {section.content.overview}
                    </p>
                  </div>

                  {/* Details List */}
                  {section.content.details && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Key Points
                      </h3>
                      <ul className="space-y-2">
                        {section.content.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bank Details (Special for Payment Terms) */}
                  {section.id === "payment-terms" && section.content.bankDetails && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-red-600" />
                        Bank Account Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Bank Name</p>
                          <p className="text-gray-900 font-medium">{section.content.bankDetails.bankName}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Branch</p>
                          <p className="text-gray-900 font-medium">{section.content.bankDetails.branch}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Account Name</p>
                          <p className="text-gray-900 font-medium">{section.content.bankDetails.accountName}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Account Number</p>
                          <p className="text-gray-900 font-medium">{section.content.bankDetails.accountNumber}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">SWIFT Code</p>
                          <p className="text-gray-900 font-mono font-medium">{section.content.bankDetails.swiftCode}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Bank Address</p>
                          <p className="text-gray-900 text-sm">{section.content.bankDetails.address}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shipping Times (Special for Shipping Terms) */}
                  {section.id === "shipping-terms" && section.content.shippingTimes && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Estimated Shipping Times
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {section.content.shippingTimes.map((item) => (
                          <div key={item.region} className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-900">{item.region}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exceptions (Special for Cancellation Policy) */}
                  {section.id === "cancellation-policy" && section.content.exceptions && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        Exceptions
                      </h3>
                      <ul className="space-y-2">
                        {section.content.exceptions.map((exception, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-orange-600 mt-1">✓</span>
                            <span>{exception}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Claims Process (Special for Warranty) */}
                  {section.id === "warranty-claims" && section.content.process && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        Claims Process
                      </h3>
                      <div className="space-y-3">
                        {section.content.process.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <span className="text-gray-600">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents List (Special for Documentation) */}
                  {section.id === "documentation" && section.content.documents && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                          Required Documents
                        </h3>
                        <ul className="space-y-2">
                          {section.content.documents.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <span className="text-purple-600 mt-1">📄</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-purple-600" />
                          Customs Notes
                        </h3>
                        <ul className="space-y-2">
                          {section.content.customsNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <span className="text-purple-600 mt-1">⚠️</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Contact for Dispute Resolution */}
                  {section.id === "dispute-resolution" && section.content.contact && (
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <p className="text-orange-800">{section.content.contact}</p>
                    </div>
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        </div>

        {/* Acknowledgment CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gray-50 border-t border-gray-200 py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              By proceeding with a purchase, you acknowledge that you have read and agree to these terms.
            </h2>
            <p className="text-gray-600 mb-8">
              If you have any questions about our terms or payment process, please don't hesitate to contact us.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/inventory">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-xl px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                  Browse Inventory
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-xl px-8 py-3 border-gray-300 hover:border-red-500 hover:bg-red-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}