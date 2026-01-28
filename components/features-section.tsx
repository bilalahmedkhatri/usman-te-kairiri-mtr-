"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, Clock, Trophy } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Quality Inspected",
        description: "Every vehicle undergoes a rigorous 150-point inspection before export."
    },
    {
        icon: Globe,
        title: "Global Shipping",
        description: "We handle all logistics to deliver your vehicle safely to your nearest port."
    },
    {
        icon: Trophy,
        title: "Premium Inventory",
        description: "Access to exclusive auctions and dealer networks across Japan."
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Our dedicated team is always available to assist with your inquiries."
    }
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50 rounded-3xl mb-20 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase mb-3 block">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                        The Gold Standard in <br /> Vehicle Export
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We streamline the car export process, ensuring a hassle-free experience from auction to driveway with unmatched transparency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground font-heading">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
