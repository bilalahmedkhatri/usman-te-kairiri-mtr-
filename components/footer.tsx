'use client';

import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "@/lib/api";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsApi.getAll(),
  });

  const currentYear = new Date().getFullYear();
  const copyrightYear = settings?.copyright_year || currentYear;

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/carsinternational", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/carsinternational", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/carsinternational", color: "hover:text-pink-600" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/carsinternational", color: "hover:text-red-600" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div>
            <div className="mb-4">
              <Link href="/" className="flex items-center gap-2">
                <Logo variant="horizontal" />
              </Link>
            </div>
            {settings?.address && (
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {settings.address}
                </p>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            )}
            {settings?.email_primary && (
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${settings.email_primary}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {settings.email_primary}
                </a>
              </div>
            )}
            {settings?.license_number && (
              <p className="text-sm text-gray-600">
                License#: {settings.license_number}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-600 hover:text-gray-900 transition-colors">
                  All Stocks
                </Link>
              </li>
              <li>
                <Link href="/customer-review" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/how-to-buy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-payment" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Payment
                </Link>
              </li>
              <li>
                <Link href="/regional-contacts" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Regional Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Options */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Options</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Vehicle Inquiry
                </Link>
              </li>
              <li>
                <Link href="/shipping-calculator" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Shipping Calculator
                </Link>
              </li>
              <li>
                <Link href="/regional-contacts" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Regional Offices
                </Link>
              </li>
              <li>
                <span className="text-gray-600">Business Hours:</span>
              </li>
              <li className="text-gray-500 text-xs">
                Mon-Fri: 9:00 AM - 6:00 PM JST
              </li>
              <li className="text-gray-500 text-xs">
                Sat: 10:00 AM - 4:00 PM JST
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              Stay updated with our latest inventory and news.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-gray-700" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/newsletter"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Big Font */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <div className="text-center my-20">
            <p className="text-7xl md:text-9xl font-bold mb-2 leading-tight bg-linear-to-r from-red-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
              TE-KAIRIRI-MOTORS
            </p>
            <p className="text-lg text-gray-600 mt-8">
              Your Trusted Partner in Vehicle Export Worldwide
            </p>
            <p className="text-sm text-gray-500 mt-4">
              © {copyrightYear} {settings?.company_name || "TE KAIRIRI MOTORS"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}