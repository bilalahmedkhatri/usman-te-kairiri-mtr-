"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Globe, Send, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });
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
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Here you would make your actual API call
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });

            setIsSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            }, 3000);

        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: "" }));
        }
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
                            Get in Touch
                        </Badge>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions about importing a vehicle? Our team of experts is here to help you navigate the process.
                    </p>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeIn}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 text-lg">
                                We're here to answer your questions and help you find your perfect Japanese vehicle.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeIn} className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <MapPin className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Headquarters</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        123 Port Road, Yokohama<br />
                                        Kanagawa 220-0012, Japan
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <Phone className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Phone</h3>
                                    <p className="text-gray-600">+81 45 123 4567</p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Mon-Fri 9:00 - 18:00 JST
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <Mail className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Email</h3>
                                    <p className="text-gray-600">sales@carsinternational.com</p>
                                    <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300">
                                    <Globe className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Global Support</h3>
                                    <p className="text-gray-600">We serve customers in over 50 countries worldwide</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Office Hours Card */}
                        <motion.div
                            variants={fadeIn}
                            className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-red-600" />
                                <h3 className="font-semibold text-gray-900">Office Hours</h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM JST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM JST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="text-gray-900 font-medium">Closed</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-600">
                                            Thank you for reaching out. We'll get back to you shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-gray-700">First name *</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    placeholder="John"
                                                    className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.firstName ? 'border-red-500' : ''}`}
                                                />
                                                {errors.firstName && (
                                                    <p className="text-xs text-red-600">{errors.firstName}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-gray-700">Last name *</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Doe"
                                                    className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.lastName ? 'border-red-500' : ''}`}
                                                />
                                                {errors.lastName && (
                                                    <p className="text-xs text-red-600">{errors.lastName}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-700">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
                                            <Input
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Inquiry about Stock #12345"
                                                className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.subject ? 'border-red-500' : ''}`}
                                            />
                                            {errors.subject && (
                                                <p className="text-xs text-red-600">{errors.subject}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-gray-700">Message *</Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="How can we help you?"
                                                rows={5}
                                                className={`border-gray-200 focus:border-red-500 focus:ring-red-500 ${errors.message ? 'border-red-500' : ''}`}
                                            />
                                            {errors.message && (
                                                <p className="text-xs text-red-600">{errors.message}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-xl py-3 shadow-md hover:shadow-lg transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="container mx-auto px-4 pb-20"
            >
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.901088331169!2d139.640749!3d35.443482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185d0e4c3b9b2b%3A0x5e8c8f8b8b8b8b8b!2sYokohama%2C%20Kanagawa%2C%20Japan!5e0!3m2!1sen!2s!4v1234567890"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                        title="TE KAIRIRI MOTORS Location"
                    />
                </div>
            </motion.div>
        </div>
    );
}