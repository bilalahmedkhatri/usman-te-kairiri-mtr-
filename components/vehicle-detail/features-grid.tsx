"use client";

import { cn } from "@/lib/utils";

interface FeaturesGridProps {
    features?: string[];
}

// Default list of features to check against if not provided by API
const COMMON_FEATURES = [
    "Power Window",
    "Rear Spoiler",
    "Alloy Wheel",
    "Leather Seats",
    "Back Tire",
    "Power Steering",
    "Roof Rail",
    "Navigation System",
    "Air Bag",
    "Dual Air Bag",
    "Sun Roof",
    "Grill Guard",
    "Television",
    "Anti-lock braking system",
    "Fog Lamp",
];

export function FeaturesGrid({ features = [] }: FeaturesGridProps) {
    // If we have actual features from API, use them. 
    // Otherwise we'll randomly simulate some for demo purposes if the array is empty 
    // (In production, replace with actual empty check)

    // For demo/dev: enrich the feature list if it's sparse
    // In a real app, this logic would depend on strictly what's in the DB
    const displayFeatures = COMMON_FEATURES.map(name => {
        // Check if the feature is in the vehicle's feature list
        // matching loosely by checking if the vehicle feature string includes our common feature name
        // or vice versa, to handle slight naming variations.
        const isAvailable = features.length > 0
            ? features.some(f => f.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(f.toLowerCase()))
            : Math.random() > 0.3; // Randomly assign availability if no data content (MOCK for demo)

        return { name, isAvailable };
    });

    return (
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm mt-8">
            <div className="bg-emerald-800 text-white px-4 py-2 font-bold text-sm uppercase tracking-wide">
                Features
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 text-sm">
                {displayFeatures.map((feature, index) => (
                    <div
                        key={feature.name}
                        className={cn(
                            "flex items-center justify-center p-3 border-b border-r last:border-r-0 md:nth-[3n]:border-r-0 text-center transition-colors",
                            feature.isAvailable
                                ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-medium"
                                : "text-muted-foreground/50"
                        )}
                    >
                        {feature.isAvailable ? (
                            <span className="truncate">{feature.name}</span>
                        ) : (
                            <span className="truncate line-through decoration-slate-300 dark:decoration-slate-700">{feature.name}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
