"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Users,
  Building2,
  MessageCircle,
  Shield,
  Calendar
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

const regions = [
  {
    name: "East Africa",
    description: "Serving Kenya, Tanzania, Uganda, Rwanda, Burundi, and South Sudan",
    timezone: "EAT (UTC+3)",
    languages: ["English", "Swahili"],
    offices: [
      {
        city: "Mombasa",
        country: "Kenya",
        address: "Mombasa Business Park, 3rd Floor, Mombasa CBD",
        phone: "+254 700 123 456",
        email: "kenya@tekairiri.com",
        whatsapp: "+254 700 123 456",
        hours: "Mon-Fri: 8:30 AM - 5:30 PM EAT",
        services: ["Port Clearance", "Customs Brokerage", "Vehicle Delivery", "Inspection Services"]
      },
      {
        city: "Dar es Salaam",
        country: "Tanzania",
        address: "Kurasini Business District, Plot 45",
        phone: "+255 700 987 654",
        email: "tanzania@tekairiri.com",
        whatsapp: "+255 700 987 654",
        hours: "Mon-Fri: 8:00 AM - 5:00 PM EAT",
        services: ["Port Clearance", "Vehicle Registration", "Import Consulting"]
      },
      {
        city: "Kampala",
        country: "Uganda",
        address: "Nakasero Business Centre, 2nd Floor",
        phone: "+256 700 456 789",
        email: "uganda@tekairiri.com",
        whatsapp: "+256 700 456 789",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM EAT",
        services: ["Customs Clearance", "Vehicle Registration", "Logistics Support"]
      }
    ]
  },
  {
    name: "Caribbean",
    description: "Serving Jamaica, Bahamas, Trinidad, Barbados, and Eastern Caribbean",
    timezone: "EST (UTC-5)",
    languages: ["English", "Jamaican Patois"],
    offices: [
      {
        city: "Kingston",
        country: "Jamaica",
        address: "10-12 Ocean Boulevard, Kingston",
        phone: "+1 876 555 1234",
        email: "jamaica@tekairiri.com",
        whatsapp: "+1 876 555 1234",
        hours: "Mon-Fri: 8:30 AM - 5:00 PM EST",
        services: ["Port Clearance", "Customs Brokerage", "Vehicle Delivery", "Financing Assistance"]
      },
      {
        city: "Nassau",
        country: "Bahamas",
        address: "East Bay Street, Nassau",
        phone: "+1 242 555 6789",
        email: "bahamas@tekairiri.com",
        whatsapp: "+1 242 555 6789",
        hours: "Mon-Fri: 9:00 AM - 5:30 PM EST",
        services: ["Customs Clearance", "Vehicle Registration", "Insurance Assistance"]
      },
      {
        city: "Port of Spain",
        country: "Trinidad & Tobago",
        address: "Wrightson Road, Port of Spain",
        phone: "+1 868 555 2345",
        email: "trinidad@tekairiri.com",
        whatsapp: "+1 868 555 2345",
        hours: "Mon-Fri: 8:00 AM - 4:30 PM AST",
        services: ["Port Clearance", "Customs Brokerage", "Vehicle Inspection"]
      }
    ]
  },
  {
    name: "Oceania",
    description: "Serving New Zealand, Australia, Fiji, and Pacific Islands",
    timezone: "NZST (UTC+12) / AEST (UTC+10)",
    languages: ["English"],
    offices: [
      {
        city: "Auckland",
        country: "New Zealand",
        address: "15 Customs Street East, Auckland CBD",
        phone: "+64 9 123 4567",
        email: "nz@tekairiri.com",
        whatsapp: "+64 9 123 4567",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM NZST",
        services: ["Compliance Testing", "Customs Clearance", "Vehicle Registration", "Warranty Support"]
      },
      {
        city: "Sydney",
        country: "Australia",
        address: "123 George Street, Sydney NSW 2000",
        phone: "+61 2 9876 5432",
        email: "australia@tekairiri.com",
        whatsapp: "+61 2 9876 5432",
        hours: "Mon-Fri: 9:00 AM - 5:30 PM AEST",
        services: ["Import Compliance", "Customs Clearance", "Vehicle Inspection", "Delivery Coordination"]
      },
      {
        city: "Suva",
        country: "Fiji",
        address: "Victoria Parade, Suva",
        phone: "+679 330 1234",
        email: "fiji@tekairiri.com",
        whatsapp: "+679 330 1234",
        hours: "Mon-Fri: 8:30 AM - 5:00 PM FJT",
        services: ["Port Clearance", "Customs Brokerage", "Logistics Support"]
      }
    ]
  },
  {
    name: "Southern Africa",
    description: "Serving South Africa, Zambia, Zimbabwe, Botswana, and Mozambique",
    timezone: "SAST (UTC+2)",
    languages: ["English", "Afrikaans", "Zulu"],
    offices: [
      {
        city: "Johannesburg",
        country: "South Africa",
        address: "Rivonia Road, Sandton",
        phone: "+27 11 456 7890",
        email: "southafrica@tekairiri.com",
        whatsapp: "+27 11 456 7890",
        hours: "Mon-Fri: 8:00 AM - 5:00 PM SAST",
        services: ["Customs Clearance", "Vehicle Registration", "Compliance Testing", "Delivery"]
      },
      {
        city: "Lusaka",
        country: "Zambia",
        address: "Great East Road, Lusaka",
        phone: "+260 966 123 456",
        email: "zambia@tekairiri.com",
        whatsapp: "+260 966 123 456",
        hours: "Mon-Fri: 8:30 AM - 5:30 PM CAT",
        services: ["Port Clearance", "Customs Brokerage", "Import Consulting"]
      }
    ]
  },
  {
    name: "North America",
    description: "Serving USA, Canada, and Mexico",
    timezone: "EST/PST (UTC-5/UTC-8)",
    languages: ["English", "Spanish", "French"],
    offices: [
      {
        city: "Los Angeles",
        country: "USA",
        address: "1234 Wilshire Blvd, Suite 500, Los Angeles, CA 90017",
        phone: "+1 213 555 6789",
        email: "usa@tekairiri.com",
        whatsapp: "+1 213 555 6789",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM PST",
        services: ["Customs Clearance", "EPA/DOT Compliance", "Vehicle Delivery", "Financing"]
      },
      {
        city: "Toronto",
        country: "Canada",
        address: "100 King Street West, Toronto, ON M5X 1A9",
        phone: "+1 416 555 1234",
        email: "canada@tekairiri.com",
        whatsapp: "+1 416 555 1234",
        hours: "Mon-Fri: 9:00 AM - 5:30 PM EST",
        services: ["RIV Compliance", "Customs Clearance", "Vehicle Registration"]
      }
    ]
  },
  {
    name: "Europe",
    description: "Serving UK, Germany, France, Netherlands, and Scandinavia",
    timezone: "CET/GMT (UTC+1/UTC+0)",
    languages: ["English", "German", "French", "Dutch"],
    offices: [
      {
        city: "London",
        country: "UK",
        address: "1 Canada Square, Canary Wharf, London E14 5AB",
        phone: "+44 20 7123 4567",
        email: "uk@tekairiri.com",
        whatsapp: "+44 20 7123 4567",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM GMT",
        services: ["IVA Testing", "Customs Clearance", "Vehicle Registration", "Delivery"]
      },
      {
        city: "Hamburg",
        country: "Germany",
        address: "Am Sandtorkai 5, 20457 Hamburg",
        phone: "+49 40 1234 5678",
        email: "germany@tekairiri.com",
        whatsapp: "+49 40 1234 5678",
        hours: "Mon-Fri: 8:30 AM - 5:30 PM CET",
        services: ["TÜV Testing", "Customs Clearance", "EU Compliance"]
      }
    ]
  },
  {
    name: "Asia Pacific",
    description: "Serving Singapore, Malaysia, Thailand, Philippines, and Vietnam",
    timezone: "SGT (UTC+8)",
    languages: ["English", "Chinese", "Malay", "Thai"],
    offices: [
      {
        city: "Singapore",
        country: "Singapore",
        address: "60 Paya Lebar Road, #08-01, Singapore 409051",
        phone: "+65 6789 1234",
        email: "singapore@tekairiri.com",
        whatsapp: "+65 6789 1234",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM SGT",
        services: ["LTA Compliance", "Customs Clearance", "Vehicle Registration", "COE Services"]
      },
      {
        city: "Kuala Lumpur",
        country: "Malaysia",
        address: "Jalan Ampang, Kuala Lumpur",
        phone: "+60 3 1234 5678",
        email: "malaysia@tekairiri.com",
        whatsapp: "+60 3 1234 5678",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM MYT",
        services: ["JPJ Compliance", "Customs Clearance", "Vehicle Inspection"]
      }
    ]
  }
];

export default function RegionalContactsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TE KAIRIRI MOTORS",
    "description": "Global vehicle export services with regional offices worldwide",
    "location": regions.flatMap(region =>
      region.offices.map(office => ({
        "@type": "Place",
        "name": `${office.city}, ${office.country}`,
        "address": office.address,
        "telephone": office.phone,
        "email": office.email
      }))
    )
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
                Global Network
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Regional Offices
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We have agents and partners worldwide to assist with your import process locally.
              Our global network ensures you receive personalized support wherever you are.
            </p>
          </div>
        </motion.div>

        {/* Global Coverage Map Visualization */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-12"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Global Presence</h2>
              <p className="text-gray-600">Serving customers in over 50 countries across 7 regions</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-sm text-gray-600">Regions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">15+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">20+</div>
                <div className="text-sm text-gray-600">Offices</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regional Offices Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-16">
            {regions.map((region, regionIndex) => (
              <motion.div
                key={region.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-8 h-8 text-red-600" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{region.name}</h2>
                  </div>
                  <p className="text-gray-600 mb-2">{region.description}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Badge variant="outline" className="border-gray-200 text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {region.timezone}
                    </Badge>
                    {region.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="border-gray-200 text-gray-600">
                        <Globe className="w-3 h-3 mr-1" />
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {region.offices.map((office) => (
                    <motion.div
                      key={office.city}
                      variants={fadeIn}
                      className="group"
                    >
                      <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl text-gray-900">
                              {office.city}
                              <span className="text-sm font-normal text-gray-500 ml-2">{office.country}</span>
                            </CardTitle>
                          </div>
                          <div className="flex items-start gap-2 mt-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600">{office.address}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Contact Information */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 text-red-600" />
                              <a href={`tel:${office.phone}`} className="text-sm hover:text-red-600 transition-colors">
                                {office.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4 text-red-600" />
                              <a href={`mailto:${office.email}`} className="text-sm hover:text-red-600 transition-colors">
                                {office.email}
                              </a>
                            </div>
                            {office.whatsapp && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <MessageCircle className="w-4 h-4 text-green-600" />
                                <a href={`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, '')}`} className="text-sm hover:text-green-600 transition-colors">
                                  WhatsApp: {office.whatsapp}
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Business Hours */}
                          <div className="border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Clock className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium">Business Hours</span>
                            </div>
                            <p className="text-xs text-gray-500 pl-6">{office.hours}</p>
                          </div>

                          {/* Services */}
                          <div className="border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Shield className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium">Local Services</span>
                            </div>
                            <div className="flex flex-wrap gap-1 pl-6">
                              {office.services.map((service) => (
                                <Badge key={service} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Quick Contact Button */}
                          <Button
                            className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
                            onClick={() => window.location.href = `mailto:${office.email}?subject=Inquiry from ${office.city} Office`}
                          >
                            Contact {office.city} Office
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Headquarters Information */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-12"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Global Headquarters</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">Yokohama, Japan</p>
                    <p className="text-sm text-gray-600">123 Port Road, Yokohama</p>
                    <p className="text-sm text-gray-600">Kanagawa 220-0012, Japan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <a href="tel:+81451234567" className="text-gray-600 hover:text-red-600">+81 45 123 4567</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  <a href="mailto:headquarters@tekairiri.com" className="text-gray-600 hover:text-red-600">headquarters@tekairiri.com</a>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-gray-900">Mon-Fri: 9:00 AM - 6:00 PM JST</p>
                    <p className="text-gray-600 text-sm">Sat: 10:00 AM - 4:00 PM JST</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  <p className="text-gray-600">24/7 Global Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gradient-to-r from-red-600 to-orange-500 py-16 mt-8"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Assistance?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Contact your nearest regional office for personalized support with your vehicle import needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Global Support
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