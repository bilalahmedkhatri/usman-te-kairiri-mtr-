"use client";

import { motion } from "framer-motion";
import { Car, Truck, Zap, Users, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    { id: "suv", name: "SUVs", icon: Car, count: "120+", color: "bg-blue-500" },
    { id: "sedan", name: "Sedans", icon: Car, count: "80+", color: "bg-indigo-500" },
    { id: "truck", name: "Trucks", icon: Truck, count: "45+", color: "bg-orange-500" },
    { id: "sports", name: "Sports", icon: Zap, count: "30+", color: "bg-red-500" },
    { id: "van", name: "Vans", icon: Users, count: "50+", color: "bg-green-500" },
    { id: "commercial", name: "Commercial", icon: Box, count: "60+", color: "bg-slate-500" },
];

export function CategoryGrid({ onSelectCategory }: { onSelectCategory?: (id: string) => void }) {
    return (
        <section className="mb-20">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                        Browse by Category
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Find the perfect vehicle style for your needs
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group cursor-pointer"
                        onClick={() => onSelectCategory?.(category.id)}
                    >
                        <div className="relative h-full bg-white border border-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5">

                            {/* Icon Circle */}
                            <div className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                                category.color
                            )}>
                                <category.icon className="w-7 h-7" />
                            </div>

                            <div className="text-center">
                                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                                    {category.count} items
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
