"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Ship,
    MapPin,
    DollarSign,
    Calendar,
    Truck,
    Package,
    Calculator,
    ArrowRight,
    Info,
    CheckCircle,
    AlertCircle,
    Car,
    Weight,
    Ruler,
    Clock,
    TrendingUp,
    Mail,
    Download,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Destination regions with ports and rates
const destinations = {
    "east-africa": {
        name: "East Africa",
        ports: [
            { name: "Mombasa, Kenya", code: "MBA", baseRate: 850, transitTime: 21 },
            { name: "Dar es Salaam, Tanzania", code: "DAR", baseRate: 880, transitTime: 22 },
            { name: "Mombasa - ICD (Inland)", code: "MBA-ICD", baseRate: 950, transitTime: 24 }
        ]
    },
    "south-africa": {
        name: "Southern Africa",
        ports: [
            { name: "Durban, South Africa", code: "DUR", baseRate: 780, transitTime: 28 },
            { name: "Cape Town, South Africa", code: "CPT", baseRate: 820, transitTime: 30 },
            { name: "Walvis Bay, Namibia", code: "WVB", baseRate: 850, transitTime: 32 }
        ]
    },
    "north-america-west": {
        name: "North America - West Coast",
        ports: [
            { name: "Los Angeles, USA", code: "LAX", baseRate: 950, transitTime: 14 },
            { name: "Long Beach, USA", code: "LGB", baseRate: 950, transitTime: 14 },
            { name: "Vancouver, Canada", code: "VAN", baseRate: 920, transitTime: 15 }
        ]
    },
    "north-america-east": {
        name: "North America - East Coast",
        ports: [
            { name: "New York, USA", code: "NYC", baseRate: 1200, transitTime: 28 },
            { name: "Savannah, USA", code: "SAV", baseRate: 1150, transitTime: 26 },
            { name: "Halifax, Canada", code: "HAL", baseRate: 1180, transitTime: 27 }
        ]
    },
    "caribbean": {
        name: "Caribbean",
        ports: [
            { name: "Kingston, Jamaica", code: "KIN", baseRate: 1050, transitTime: 32 },
            { name: "Nassau, Bahamas", code: "NAS", baseRate: 1100, transitTime: 30 },
            { name: "Port of Spain, Trinidad", code: "POS", baseRate: 1080, transitTime: 34 }
        ]
    },
    "europe": {
        name: "Europe",
        ports: [
            { name: "Rotterdam, Netherlands", code: "RTM", baseRate: 650, transitTime: 35 },
            { name: "Hamburg, Germany", code: "HAM", baseRate: 680, transitTime: 36 },
            { name: "Southampton, UK", code: "SOU", baseRate: 720, transitTime: 34 },
            { name: "Antwerp, Belgium", code: "ANR", baseRate: 660, transitTime: 35 }
        ]
    },
    "oceania": {
        name: "Oceania",
        ports: [
            { name: "Auckland, New Zealand", code: "AKL", baseRate: 880, transitTime: 28 },
            { name: "Sydney, Australia", code: "SYD", baseRate: 920, transitTime: 26 },
            { name: "Melbourne, Australia", code: "MEL", baseRate: 940, transitTime: 27 },
            { name: "Brisbane, Australia", code: "BNE", baseRate: 960, transitTime: 28 }
        ]
    },
    "asia": {
        name: "Asia",
        ports: [
            { name: "Singapore", code: "SIN", baseRate: 450, transitTime: 10 },
            { name: "Port Klang, Malaysia", code: "PKG", baseRate: 480, transitTime: 12 },
            { name: "Laem Chabang, Thailand", code: "LCH", baseRate: 520, transitTime: 14 },
            { name: "Manila, Philippines", code: "MNL", baseRate: 580, transitTime: 15 }
        ]
    },
    "middle-east": {
        name: "Middle East",
        ports: [
            { name: "Jebel Ali, UAE", code: "JEA", baseRate: 620, transitTime: 18 },
            { name: "Dammam, Saudi Arabia", code: "DMM", baseRate: 680, transitTime: 20 },
            { name: "Doha, Qatar", code: "DOH", baseRate: 710, transitTime: 22 }
        ]
    }
};

// Vehicle types with size factors
const vehicleTypes = [
    { id: "compact", name: "Compact Car", factor: 1.0, dimensions: "Up to 4.5m length" },
    { id: "sedan", name: "Sedan / Hatchback", factor: 1.1, dimensions: "4.5m - 4.8m length" },
    { id: "suv", name: "SUV / Crossover", factor: 1.25, dimensions: "4.8m - 5.2m length" },
    { id: "truck", name: "Pickup Truck", factor: 1.3, dimensions: "5.0m - 5.5m length" },
    { id: "luxury", name: "Luxury / Large SUV", factor: 1.4, dimensions: "5.2m+ length" },
    { id: "van", name: "Minivan / Van", factor: 1.35, dimensions: "5.0m - 5.5m length" }
];

// Shipping methods
const shippingMethods = [
    {
        id: "ro-ro",
        name: "Ro-Ro (Roll-on/Roll-off)",
        description: "Vehicle is driven onto the vessel. Most cost-effective option.",
        multiplier: 1.0,
        icon: Ship
    },
    {
        id: "container-20",
        name: "20ft Container",
        description: "Vehicle loaded into a standard 20ft container. Recommended for standard vehicles.",
        multiplier: 1.4,
        icon: Package
    },
    {
        id: "container-40",
        name: "40ft Container",
        description: "For larger vehicles or multiple vehicles. Maximum protection.",
        multiplier: 1.8,
        icon: Package
    }
];

// Insurance options
const insuranceOptions = [
    { id: "none", name: "No Insurance", multiplier: 1.0, rate: 0 },
    { id: "basic", name: "Basic Coverage (1% of value)", multiplier: 1.01, rate: 0.01 },
    { id: "premium", name: "Premium Coverage (2% of value)", multiplier: 1.02, rate: 0.02 }
];

export default function ShippingCalculatorPage() {
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPort, setSelectedPort] = useState("");
    const [vehicleType, setVehicleType] = useState("sedan");
    const [shippingMethod, setShippingMethod] = useState("ro-ro");
    const [insurance, setInsurance] = useState("none");
    const [vehicleValue, setVehicleValue] = useState("15000");
    const [isCalculated, setIsCalculated] = useState(false);
    const [quoteSent, setQuoteSent] = useState(false);
    const [activeTab, setActiveTab] = useState("info");

    // Calculate shipping cost
    const calculateShipping = () => {
        const port = getSelectedPort();
        const vehicle = vehicleTypes.find(v => v.id === vehicleType);
        const method = shippingMethods.find(m => m.id === shippingMethod);
        const insuranceOpt = insuranceOptions.find(i => i.id === insurance);

        if (!port || !vehicle || !method) return null;

        const baseRate = port.baseRate;
        const sizeMultiplier = vehicle.factor;
        const methodMultiplier = method.multiplier;

        let shippingCost = baseRate * sizeMultiplier * methodMultiplier;
        let totalCost = shippingCost;

        // Add insurance
        let insuranceCost = 0;
        if (insurance === "basic") {
            insuranceCost = parseFloat(vehicleValue) * 0.01;
            totalCost += insuranceCost;
        } else if (insurance === "premium") {
            insuranceCost = parseFloat(vehicleValue) * 0.02;
            totalCost += insuranceCost;
        }

        // Add port handling fees
        const portFee = 250;
        totalCost += portFee;

        return {
            shippingCost: Math.round(shippingCost),
            insuranceCost: Math.round(insuranceCost),
            portFee: portFee,
            totalCost: Math.round(totalCost),
            transitTime: port.transitTime,
            portName: port.name,
            regionName: getSelectedRegion()?.name || "",
            vehicleName: vehicle.name
        };
    };

    const getSelectedRegion = () => {
        return destinations[selectedRegion as keyof typeof destinations];
    };

    const getSelectedPort = () => {
        const region = getSelectedRegion();
        if (!region) return null;
        return region.ports.find(p => p.code === selectedPort);
    };

    const calculation = calculateShipping();
    const region = getSelectedRegion();

    const handleSendQuote = () => {
        setQuoteSent(true);
        setTimeout(() => setQuoteSent(false), 3000);
    };

    useEffect(() => {
        if (selectedRegion && selectedPort && vehicleType && shippingMethod) {
            setIsCalculated(true);
        }
    }, [selectedRegion, selectedPort, vehicleType, shippingMethod, insurance, vehicleValue]);

    return (
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
                            Estimate Your Costs
                        </Badge>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Shipping Calculator
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Get an instant estimate for shipping your vehicle from Japan to your nearest port.
                        Calculate freight costs, transit times, and total delivery expenses.
                    </p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Calculator Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="lg:col-span-2"
                    >
                        <Card className="border border-gray-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                                    <Calculator className="w-6 h-6 text-red-600" />
                                    Calculate Shipping Cost
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Enter your shipping details to get an accurate estimate
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Destination */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-600" />
                                        Destination Region *
                                    </Label>
                                    <Select onValueChange={(value) => {
                                        setSelectedRegion(value);
                                        setSelectedPort("");
                                    }}>
                                        <SelectTrigger className="border-gray-200">
                                            <SelectValue placeholder="Select region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(destinations).map(([key, region]) => (
                                                <SelectItem key={key} value={key}>{region.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Port Selection */}
                                {selectedRegion && (
                                    <div className="space-y-2">
                                        <Label className="text-gray-700">Destination Port *</Label>
                                        <Select onValueChange={setSelectedPort} value={selectedPort}>
                                            <SelectTrigger className="border-gray-200">
                                                <SelectValue placeholder="Select port" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {region?.ports.map((port) => (
                                                    <SelectItem key={port.code} value={port.code}>
                                                        {port.name} - Transit: {port.transitTime} days
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Vehicle Type */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 flex items-center gap-2">
                                        <Car className="w-4 h-4 text-red-600" />
                                        Vehicle Type *
                                    </Label>
                                    <Select onValueChange={setVehicleType} value={vehicleType}>
                                        <SelectTrigger className="border-gray-200">
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vehicleTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id}>
                                                    {type.name} - {type.dimensions}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Shipping Method */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 flex items-center gap-2">
                                        <Ship className="w-4 h-4 text-red-600" />
                                        Shipping Method *
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {shippingMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setShippingMethod(method.id)}
                                                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${shippingMethod === method.id
                                                        ? "border-red-600 bg-red-50"
                                                        : "border-gray-200 hover:border-red-300"
                                                    }`}
                                            >
                                                <method.icon className={`w-6 h-6 mb-2 ${shippingMethod === method.id ? "text-red-600" : "text-gray-500"}`} />
                                                <p className="font-medium text-gray-900 text-sm">{method.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Vehicle Value */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-red-600" />
                                        Vehicle Value (USD) - for insurance *
                                    </Label>
                                    <Input
                                        type="number"
                                        value={vehicleValue}
                                        onChange={(e) => setVehicleValue(e.target.value)}
                                        placeholder="Enter vehicle value"
                                        className="border-gray-200 focus:border-red-500"
                                    />
                                </div>

                                {/* Insurance Option */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-red-600" />
                                        Insurance Coverage
                                    </Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {insuranceOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setInsurance(opt.id)}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${insurance === opt.id
                                                        ? "border-red-600 bg-red-50"
                                                        : "border-gray-200 hover:border-red-300"
                                                    }`}
                                            >
                                                <p className="font-medium text-gray-900 text-sm">{opt.name}</p>
                                                {opt.id !== "none" && (
                                                    <p className="text-xs text-gray-500">{opt.rate * 100}% of value</p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="lg:col-span-1"
                    >
                        {isCalculated && calculation ? (
                            <Card className="border border-gray-200 shadow-lg sticky top-24">
                                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                                        <Calculator className="w-5 h-5 text-red-600" />
                                        Your Estimate
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Based on your selections
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {/* Cost Breakdown */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Ocean Freight:</span>
                                            <span className="font-semibold text-gray-900">${calculation.shippingCost}</span>
                                        </div>
                                        {calculation.insuranceCost > 0 && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Insurance ({insurance === "basic" ? "1%" : "2%"}):</span>
                                                <span className="font-semibold text-gray-900">${calculation.insuranceCost}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Port Handling Fee:</span>
                                            <span className="font-semibold text-gray-900">${calculation.portFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-3">
                                            <span className="text-lg font-bold text-gray-900">Total Estimated Cost:</span>
                                            <span className="text-2xl font-bold text-red-600">${calculation.totalCost}</span>
                                        </div>
                                    </div>

                                    {/* Transit Information */}
                                    <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-900">Estimated Transit Time</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-600">{calculation.transitTime} days</p>
                                        <p className="text-xs text-gray-500">From departure to arrival at port</p>
                                    </div>

                                    {/* Vehicle Summary */}
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                        <p className="text-sm font-medium text-gray-900">Vehicle Summary</p>
                                        <p className="text-sm text-gray-600">{calculation.vehicleName}</p>
                                        <p className="text-sm text-gray-600">Destination: {calculation.portName}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3 pt-2">
                                        <Button
                                            onClick={handleSendQuote}
                                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                                        >
                                            {quoteSent ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Quote Sent!
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    Request Full Quote
                                                </>
                                            )}
                                        </Button>
                                        <Link href="/inquiry">
                                            <Button variant="outline" className="w-full border-gray-200">
                                                <Car className="w-4 h-4 mr-2" />
                                                Find Your Vehicle
                                            </Button>
                                        </Link>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center pt-4">
                                        * This is an estimate. Final costs may vary based on fuel surcharges, currency fluctuations, and port-specific fees.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="border border-gray-200 shadow-lg">
                                <CardContent className="pt-12 pb-12 text-center">
                                    <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Complete the form to see your shipping estimate</p>
                                    <p className="text-sm text-gray-400 mt-2">Select region, port, and vehicle type</p>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </div>

                {/* Additional Information - Custom Tabs */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mt-16"
                >
                    <div className="max-w-4xl mx-auto">
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`px-6 py-3 font-medium transition-all duration-200 ${activeTab === "info"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Shipping Info
                            </button>
                            <button
                                onClick={() => setActiveTab("ports")}
                                className={`px-6 py-3 font-medium transition-all duration-200 ${activeTab === "ports"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Major Ports
                            </button>
                            <button
                                onClick={() => setActiveTab("faq")}
                                className={`px-6 py-3 font-medium transition-all duration-200 ${activeTab === "faq"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                FAQ
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "info" && (
                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Ship className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Ro-Ro vs Container Shipping</h3>
                                            <p className="text-sm text-gray-600">Ro-Ro is the most cost-effective method where vehicles are driven onto the vessel. Container shipping offers maximum protection and is recommended for luxury or high-value vehicles.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Transit Times</h3>
                                            <p className="text-sm text-gray-600">Transit times vary by destination: Asia (10-14 days), North America (14-28 days), Europe (28-35 days), Africa (21-32 days). Times are estimates and may vary based on vessel schedules and port congestion.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <DollarSign className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Additional Costs</h3>
                                            <p className="text-sm text-gray-600">Import duties, taxes, customs clearance fees, and local transportation are not included in the shipping estimate. Contact your local customs office for import requirements.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "ports" && (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {Object.entries(destinations).map(([key, region]) => (
                                            <div key={key}>
                                                <h3 className="font-semibold text-gray-900 mb-2">{region.name}</h3>
                                                <ul className="space-y-1">
                                                    {region.ports.map((port) => (
                                                        <li key={port.code} className="text-sm text-gray-600">
                                                            • {port.name} ({port.transitTime} days)
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "faq" && (
                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">How accurate is this estimate?</h3>
                                        <p className="text-sm text-gray-600 mt-1">Our calculator provides a close estimate based on current market rates. Final costs may include additional fees like fuel surcharges, peak season adjustments, and local handling fees.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">What's included in the shipping cost?</h3>
                                        <p className="text-sm text-gray-600 mt-1">Ocean freight, port handling in Japan, export documentation, and basic customs clearance in Japan. Import duties and taxes at destination are separate.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Can I track my shipment?</h3>
                                        <p className="text-sm text-gray-600 mt-1">Yes! Once your vehicle is loaded, we provide tracking information so you can monitor your shipment's progress in real-time.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">What payment methods do you accept?</h3>
                                        <p className="text-sm text-gray-600 mt-1">We accept Telegraphic Transfer (T/T) bank transfers to our account in Japan. All payments are processed securely.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}