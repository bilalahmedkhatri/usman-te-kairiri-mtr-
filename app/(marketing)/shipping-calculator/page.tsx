"use client";

import { ShippingCalculator } from "@/components/shipping-calculator";

export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold font-heading mb-6">Shipping Calculator</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Estimate the freight cost to your nearest port.
                </p>
            </div>

            <div className="max-w-xl mx-auto">
                <ShippingCalculator />
            </div>
        </div>
    );
}
