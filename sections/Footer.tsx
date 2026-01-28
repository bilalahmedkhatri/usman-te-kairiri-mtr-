import { motion } from 'framer-motion';
import { 
  Car, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  inventory: [
    { label: 'All Vehicles', href: '#inventory' },
    { label: 'Sports Cars', href: '#inventory?sports' },
    { label: 'SUVs', href: '#inventory?suv' },
    { label: 'Sedans', href: '#inventory?sedan' },
    { label: 'Classic Cars', href: '#inventory?classic' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Dealers', href: '#dealers' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  support: [
    { label: 'How It Works', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Import Regulations', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Export Compliance', href: '#' },
  ],
};

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border/50">
      {/* Main Footer */}
      <div className="w-full section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red to-orange flex items-center justify-center shadow-jdm">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">JDM Export</span>
                <span className="block text-[10px] text-muted-foreground -mt-0.5">Japanese Car Marketplace</span>
              </div>
            </motion.a>

            <p className="text-sm text-muted-foreground max-w-xs">
              Your trusted gateway to premium Japanese vehicles. 
              Direct export from verified dealers to customers worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@jdmexport.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Tokyo, Japan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+81-3-1234-5678</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Inventory Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Inventory</h4>
            <ul className="space-y-3">
              {footerLinks.inventory.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <h4 className="font-semibold text-sm">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get notified about new arrivals and exclusive deals.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl border-border/50"
              />
              <Button className="rounded-xl bg-gradient-to-r from-red to-orange hover:from-red/90 hover:to-orange/90 text-white font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full section-padding py-6 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 JDM Export. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
