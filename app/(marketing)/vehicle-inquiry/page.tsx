"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Car,
    Send,
    CheckCircle,
    AlertCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Info,
    DollarSign,
    FileText,
    MessageCircle,
    Upload,
    X,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const vehicleTypes = [
    "Sedan", "SUV", "Pickup Truck", "Sports Car", "Minivan",
    "Luxury", "Commercial", "Classic", "4x4", "Electric/Hybrid"
];

const preferredColors = [
    "White", "Black", "Silver", "Gray", "Red", "Blue",
    "Green", "Yellow", "Orange", "Brown", "Other"
];

const budgetRanges = [
    "Under $10,000",
    "$10,000 - $15,000",
    "$15,000 - $20,000",
    "$20,000 - $25,000",
    "$25,000 - $30,000",
    "$30,000 - $40,000",
    "$40,000 - $50,000",
    "$50,000+",
    "Not specified"
];

const shippingDestinations = [
    "East Africa (Kenya, Tanzania, Uganda)",
    "Southern Africa (South Africa, Zambia, Zimbabwe)",
    "North America (USA, Canada)",
    "Caribbean (Jamaica, Bahamas, Trinidad)",
    "Europe (UK, Germany, Netherlands)",
    "Oceania (Australia, New Zealand)",
    "Asia (Singapore, Malaysia, Thailand)",
    "Middle East",
    "Other"
];

export default function VehicleInquiryPage() {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",

        // Vehicle Details
        make: "",
        model: "",
        year: "",
        vehicleType: "",
        preferredColor: "",
        budget: "",
        mileagePreference: "",

        // Additional Details
        shippingDestination: "",
        timeline: "",
        message: "",
        additionalRequirements: "",
        stockNumber: ""
    });

    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";

        if (!formData.make.trim()) newErrors.make = "Vehicle make is required";
        if (!formData.model.trim()) newErrors.model = "Vehicle model is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call with file upload
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would make your actual API call with FormData
            // const formDataToSend = new FormData();
            // Object.entries(formData).forEach(([key, value]) => {
            //   formDataToSend.append(key, value);
            // });
            // files.forEach((file, index) => {
            //   formDataToSend.append(`file_${index}`, file);
            // });

            // const response = await fetch('/api/inquiry', {
            //   method: 'POST',
            //   body: formDataToSend
            // });

            setIsSubmitted(true);

            // Reset form after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    firstName: "", lastName: "", email: "", phone: "", country: "", city: "",
                    make: "", model: "", year: "", vehicleType: "", preferredColor: "", budget: "",
                    mileagePreference: "", shippingDestination: "", timeline: "", message: "",
                    additionalRequirements: "", stockNumber: ""
                });
                setFiles([]);
            }, 5000);

        } catch (error) {
            console.error("Error submitting inquiry:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: "" }));
        }
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

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
                            Find Your Dream Car
                        </Badge>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Vehicle Inquiry
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Looking for a specific Japanese vehicle? Let us help you find the perfect car that matches your requirements. Fill out the form below and our team will respond within 24 hours.
                    </p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Left Column - Information */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 space-y-6">
                            {/* Why Submit an Inquiry */}
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gray-900">Why Submit an Inquiry?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Car className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Access to Exclusive Inventory</p>
                                            <p className="text-xs text-gray-500">Get notified about vehicles not listed on our website</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <DollarSign className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Personalized Price Quotes</p>
                                            <p className="text-xs text-gray-500">Receive custom quotes based on your specific requirements</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Priority Support</p>
                                            <p className="text-xs text-gray-500">Get dedicated assistance from our vehicle experts</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* What Happens Next */}
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gray-900">What Happens Next?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Inquiry Received</p>
                                            <p className="text-xs text-gray-500">Our team reviews your requirements</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Vehicle Search</p>
                                            <p className="text-xs text-gray-500">We search Japan's auction network for your vehicle</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Quote & Inspection</p>
                                            <p className="text-xs text-gray-500">Receive detailed quote with inspection report</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Order Confirmation</p>
                                            <p className="text-xs text-gray-500">Proceed with payment and shipping arrangements</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Have a Stock Number? */}
                            <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-red-50 to-orange-50">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gray-900">Have a Stock Number?</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        If you already found a vehicle on our inventory, enter the stock number in the form for faster processing.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/inventory">
                                        <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                                            Browse Our Inventory
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Right Column - Inquiry Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="lg:col-span-2"
                    >
                        <Card className="border border-gray-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-900">Vehicle Inquiry Form</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Please fill out all required fields to help us find the perfect vehicle for you.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Inquiry Submitted!</h3>
                                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                            Thank you for your inquiry. Our team will review your requirements and get back to you within 24 hours with personalized options.
                                        </p>
                                        <div className="flex justify-center gap-3">
                                            <Badge className="bg-green-100 text-green-700">Reference: #INQ{Math.floor(Math.random() * 10000)}</Badge>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Personal Information Section */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <User className="w-5 h-5 text-red-600" />
                                                Personal Information
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName" className="text-gray-700">First Name *</Label>
                                                    <Input
                                                        id="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        placeholder="John"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.firstName ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName" className="text-gray-700">Last Name *</Label>
                                                    <Input
                                                        id="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Doe"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.lastName ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.email ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                                                    <Input
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+1 234 567 8900"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.phone ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="country" className="text-gray-700">Country *</Label>
                                                    <Input
                                                        id="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        placeholder="Your country"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.country ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city" className="text-gray-700">City</Label>
                                                    <Input
                                                        id="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        placeholder="Your city"
                                                        className="border-gray-200 focus:border-red-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vehicle Details Section */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Car className="w-5 h-5 text-red-600" />
                                                Vehicle Details
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="make" className="text-gray-700">Make *</Label>
                                                    <Input
                                                        id="make"
                                                        value={formData.make}
                                                        onChange={handleChange}
                                                        placeholder="e.g., Toyota, Nissan, Honda"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.make ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.make && <p className="text-xs text-red-600">{errors.make}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="model" className="text-gray-700">Model *</Label>
                                                    <Input
                                                        id="model"
                                                        value={formData.model}
                                                        onChange={handleChange}
                                                        placeholder="e.g., Supra, GT-R, Civic"
                                                        className={`border-gray-200 focus:border-red-500 ${errors.model ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.model && <p className="text-xs text-red-600">{errors.model}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="year" className="text-gray-700">Year (optional)</Label>
                                                    <Input
                                                        id="year"
                                                        value={formData.year}
                                                        onChange={handleChange}
                                                        placeholder="e.g., 2020-2024"
                                                        className="border-gray-200 focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="stockNumber" className="text-gray-700">Stock Number (if applicable)</Label>
                                                    <Input
                                                        id="stockNumber"
                                                        value={formData.stockNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter stock number from inventory"
                                                        className="border-gray-200 focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="vehicleType" className="text-gray-700">Vehicle Type</Label>
                                                    <Select onValueChange={(value) => handleSelectChange("vehicleType", value)}>
                                                        <SelectTrigger className="border-gray-200">
                                                            <SelectValue placeholder="Select vehicle type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {vehicleTypes.map((type) => (
                                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="preferredColor" className="text-gray-700">Preferred Color</Label>
                                                    <Select onValueChange={(value) => handleSelectChange("preferredColor", value)}>
                                                        <SelectTrigger className="border-gray-200">
                                                            <SelectValue placeholder="Select color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {preferredColors.map((color) => (
                                                                <SelectItem key={color} value={color}>{color}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="budget" className="text-gray-700">Budget Range</Label>
                                                    <Select onValueChange={(value) => handleSelectChange("budget", value)}>
                                                        <SelectTrigger className="border-gray-200">
                                                            <SelectValue placeholder="Select budget range" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {budgetRanges.map((range) => (
                                                                <SelectItem key={range} value={range}>{range}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="mileagePreference" className="text-gray-700">Mileage Preference</Label>
                                                    <Input
                                                        id="mileagePreference"
                                                        value={formData.mileagePreference}
                                                        onChange={handleChange}
                                                        placeholder="e.g., Under 50,000 km"
                                                        className="border-gray-200 focus:border-red-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping & Additional Details */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-red-600" />
                                                Shipping & Additional Details
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="shippingDestination" className="text-gray-700">Shipping Destination</Label>
                                                    <Select onValueChange={(value) => handleSelectChange("shippingDestination", value)}>
                                                        <SelectTrigger className="border-gray-200">
                                                            <SelectValue placeholder="Select destination" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {shippingDestinations.map((dest) => (
                                                                <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="timeline" className="text-gray-700">Preferred Timeline</Label>
                                                    <Input
                                                        id="timeline"
                                                        value={formData.timeline}
                                                        onChange={handleChange}
                                                        placeholder="e.g., Within 1 month"
                                                        className="border-gray-200 focus:border-red-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 mt-4">
                                                <Label htmlFor="additionalRequirements" className="text-gray-700">Additional Requirements</Label>
                                                <Input
                                                    id="additionalRequirements"
                                                    value={formData.additionalRequirements}
                                                    onChange={handleChange}
                                                    placeholder="e.g., Sunroof, Navigation, Leather seats, etc."
                                                    className="border-gray-200 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Message Section */}
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-gray-700">Message / Special Requests</Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more about what you're looking for..."
                                                rows={4}
                                                className="border-gray-200 focus:border-red-500"
                                            />
                                        </div>

                                        {/* File Upload */}
                                        <div className="space-y-2">
                                            <Label className="text-gray-700">Reference Images (Optional)</Label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-500 mb-2">Upload reference images of vehicles you like</p>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                    id="file-upload"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => document.getElementById("file-upload")?.click()}
                                                    className="text-sm"
                                                >
                                                    Choose Files
                                                </Button>
                                            </div>
                                            {files.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {files.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                            <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-xl py-6 shadow-md hover:shadow-lg transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                    Submitting Inquiry...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Submit Vehicle Inquiry
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-gray-500 text-center">
                                            By submitting this form, you agree to our Terms of Service and Privacy Policy.
                                            We'll never share your information with third parties.
                                        </p>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}