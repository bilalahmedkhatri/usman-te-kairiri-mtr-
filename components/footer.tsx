"use client";

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
    <footer className="border-t bg-muted/50 mt-auto">
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
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {settings.address}
                </p>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            )}
            {settings?.email_primary && (
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href={`mailto:${settings.email_primary}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {settings.email_primary}
                </a>
              </div>
            )}
            {settings?.license_number && (
              <p className="text-sm text-muted-foreground">
                License#: {settings.license_number}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Stocks
                </Link>
              </li>
              <li>
                <Link href="/customer-review" className="text-muted-foreground hover:text-foreground transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/how-to-buy" className="text-muted-foreground hover:text-foreground transition-colors">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-payment" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Payment
                </Link>
              </li>
              <li>
                <Link href="/regional-contacts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Regional Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Options */}
          <div>
            <h3 className="font-semibold mb-4">Contact Options</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-muted-foreground hover:text-foreground transition-colors">
                  Vehicle Inquiry
                </Link>
              </li>
              <li>
                <Link href="/shipping-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Calculator
                </Link>
              </li>
              <li>
                <Link href="/regional-contacts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Regional Offices
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Business Hours:</span>
              </li>
              <li className="text-muted-foreground text-xs">
                Mon-Fri: 9:00 AM - 6:00 PM JST
              </li>
              <li className="text-muted-foreground text-xs">
                Sat: 10:00 AM - 4:00 PM JST
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with our latest inventory and news.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/newsletter"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Big Font */}
        <div className="border-t mt-10 pt-8 ">
          <div className="text-center my-20">
            <p className="text-7xl md:text-9xl font-bold text-primary mb-2 leading-tight gradient-text">
              TE-KAIRIRI-MOTORS
            </p>
            <p className="text-lg text-muted-foreground mt-8">
              Your Trusted Partner in Vehicle Export Worldwide
            </p>
            <p className="text-sm text-muted-foreground">
              © {copyrightYear} {settings?.company_name || "TE KAIRIRI MOTORS"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
