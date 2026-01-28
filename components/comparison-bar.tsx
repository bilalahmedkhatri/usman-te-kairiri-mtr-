"use client";

import { useComparison } from "@/lib/store/comparison-store";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/lib/format";

export function ComparisonBar() {
    const { vehicles, removeVehicle, clearAll } = useComparison();

    if (vehicles.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t shadow-2xl"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Compare ({vehicles.length})</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAll}
                                className="text-destructive"
                            >
                                Clear All
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 flex-1 overflow-x-auto py-2">
                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className="relative flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-2 min-w-[200px]"
                                >
                                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={vehicle.image_urls?.[0] || "https://via.placeholder.com/150"}
                                            alt={vehicle.title || `${vehicle.make} ${vehicle.model}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {vehicle.make} {vehicle.model}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatCurrency(vehicle.price)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeVehicle(vehicle.id)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90"
                                        aria-label={`Remove ${vehicle.make} ${vehicle.model} from comparison`}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Link href="/comparison">
                            <Button className="rounded-full gap-2">
                                Compare Now <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
