"use client";

import { Search, CreditCard, Ship, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Find Your Vehicle",
    description: "Browse our extensive inventory of over 10,000 vehicles. Use our detailed filters to find exactly what you're looking for by make, model, year, and price."
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Order & Payment",
    description: "Submit your order or inquiry. We will send you a Pro forma Invoice. Complete the payment via Telegraphic Transfer (T/T) to our bank account in Japan."
  },
  {
    id: 3,
    icon: Ship,
    title: "Shipment Booking",
    description: "Once payment is confirmed, we book the earliest available vessel to your destination port. We handle all export documentation and customs clearance."
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Receive Documents",
    description: "We dispatch all necessary documents via DHL/FedEx, including B/L, Export Certificate, and Commercial Invoice, so you can clear customs at your port."
  }
];

export default function HowToBuyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">How to Buy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your simple 4-step guide to importing a vehicle from Japan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -z-10 transform -translate-x-1/2" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 text-center md:text-left">
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                  <span className="text-primary font-bold text-lg mb-2">Step 0{step.id}</span>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                  <step.icon className="w-8 h-8" />
                </div>
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/inventory">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg">
              Start Browsing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
