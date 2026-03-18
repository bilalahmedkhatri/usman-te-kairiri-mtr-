'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, MapPin, Gauge, Settings, BadgeInfo,
    Share2, Printer, Heart, ArrowLeft,
    Ship, FileCheck, CircleDollarSign, X, ChevronLeft, ChevronRight,
    Info, Clock, Shield, ExternalLink, Navigation, Zap, Car
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Define comprehensive types matching the data passed from server
export type VehicleImage = {
    id: number;
    url: string;
    isPrimary: boolean;
    altText?: string;
    sortOrder?: number;
};

export type VehicleSpecs = {
    engineCode?: string;
    engineCc?: number;
    fuelType?: string;
    transmission?: string;
    driveType?: string;
    steering?: string;
    seats?: number;
    doors?: number;
    colorExterior?: string;
    colorInterior?: string;
    mileageKm?: number;
    vehicleType?: string;
    powerKw?: number;
    powerHp?: number;
    torqueNm?: number;
    weightKg?: number;
    dimensions?: string;
    fuelConsumption?: string;
    emissionStandard?: string;
};

export type VehicleLogistics = {
    currentPortId?: string;
    currentPortName?: string;
    originCountry?: string;
    originPort?: string;
    inspectionStatus?: string;
    inspectionDate?: string;
    etaDestination?: string;
    shippingStatus?: string;
};

export type VehicleDocument = {
    id: number;
    type: string;
    url: string;
    title?: string;
};

export type VehicleHistory = {
    previousOwners?: number;
    serviceHistory?: boolean;
    accidentHistory?: boolean;
    importDate?: string;
};

export type VehicleDetailData = {
    id: number;
    stockNumber: string;
    vinChassis: string;
    make: string;
    model: string;
    yearManufacture: number;
    yearRegistration?: number;
    priceFob: number;
    priceRetail?: number;
    currency?: string;
    status: string;
    featured: boolean;
    description?: string;
    images: VehicleImage[];
    specs?: VehicleSpecs;
    logistics?: VehicleLogistics;
    documents?: VehicleDocument[];
    history?: VehicleHistory;
    createdAt?: string;
    updatedAt?: string;
};

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
        AVAILABLE: { bg: 'bg-green-500', text: 'text-white', label: 'Available' },
        RESERVED: { bg: 'bg-yellow-500', text: 'text-white', label: 'Reserved' },
        SOLD: { bg: 'bg-gray-500', text: 'text-white', label: 'Sold' },
        PENDING: { bg: 'bg-blue-500', text: 'text-white', label: 'Pending' },
        IN_TRANSIT: { bg: 'bg-purple-500', text: 'text-white', label: 'In Transit' },
    };

    const config = statusConfig[status] || { bg: 'bg-gray-500', text: 'text-white', label: status };

    return (
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-md ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
};

// Spec card component
const SpecCard = ({
    icon: Icon,
    label,
    value,
    color = 'blue',
    className = ''
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: 'blue' | 'orange' | 'purple' | 'teal' | 'green' | 'red' | 'indigo';
    className?: string;
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        teal: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    };

    return (
        <div className={`bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3 ${className}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-gray-900 dark:text-white truncate">{value || 'N/A'}</p>
            </div>
        </div>
    );
};

// Detail row component
const DetailRow = ({ label, value, highlight = false }: { label: string; value: React.ReactNode; highlight?: boolean }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
        <span className={`font-medium text-sm ${highlight ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
            {value || 'N/A'}
        </span>
    </div>
);

// Lightbox component for image gallery
const ImageLightbox = ({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNext,
    onPrev
}: {
    images: VehicleImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                onClick={onClose}
            >
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
                >
                    <X className="w-8 h-8" />
                </Button>

                {images.length > 1 && (
                    <>
                        <Button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </Button>
                        <Button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </Button>
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                    {currentIndex + 1} / {images.length}
                </div>

                <motion.img
                    key={currentImage.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    src={currentImage.url}
                    alt={currentImage.altText || 'Vehicle image'}
                    className="max-w-[90vw] max-h-[85vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default function VehicleDetailClient({ vehicle }: { vehicle: VehicleDetailData }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Sort images so primary is first, then by sortOrder
    const sortedImages = [...vehicle.images].sort((a, b) => {
        if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
        return (a.sortOrder || 0) - (b.sortOrder || 0);
    });

    const activeImage = sortedImages[activeImageIndex];

    const handleNextImage = useCallback(() => {
        setActiveImageIndex((prev) => (prev + 1) % sortedImages.length);
    }, [sortedImages.length]);

    const handlePrevImage = useCallback(() => {
        setActiveImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    }, [sortedImages.length]);

    const formatCurrency = (amount: number, currency: string = 'JPY') => {
        const symbol = currency === 'JPY' ? '¥' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
        return `${symbol}${amount.toLocaleString()}`;
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
            {/* Breadcrumb & Navigation */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
                    <Link
                        href="/dashboard/vehicles"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Inventory</span>
                        <span className="sm:hidden">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                            onClick={() => navigator.share?.({ title: `${vehicle.make} ${vehicle.model}`, url: window.location.href })}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            title="Share"
                            aria-label="Share vehicle"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={() => window.print()}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors hidden sm:block"
                            title="Print"
                        >
                            <Printer className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-2 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            title="Add to wishlist"
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-4 sm:py-8">
                {/* Mobile Title (visible only on small screens) */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden mb-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <StatusBadge status={vehicle.status} />
                        {vehicle.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Featured
                            </span>
                        )}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {vehicle.yearManufacture} {vehicle.make} {vehicle.model}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Stock #: <span className="font-mono font-medium">{vehicle.stockNumber}</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Column - Images */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="lg:col-span-7 space-y-3 sm:space-y-4"
                    >
                        {/* Main Image */}
                        <motion.div
                            variants={fadeInUp}
                            layoutId={`vehicle-image-${vehicle.id}`}
                            className="aspect-[16/10] sm:aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-lg cursor-zoom-in group"
                            onClick={() => setLightboxOpen(true)}
                        >
                            {activeImage ? (
                                <>
                                    <Image
                                        src={activeImage.url}
                                        alt={activeImage.altText || `${vehicle.make} ${vehicle.model}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Car className="w-16 h-16 text-gray-400" />
                                    <span className="text-gray-400 ml-2">No Image Available</span>
                                </div>
                            )}

                            {/* Status Badge (desktop only - mobile is above) */}
                            <div className="absolute top-3 left-3 hidden lg:block">
                                <StatusBadge status={vehicle.status} />
                            </div>

                            {/* Featured Badge */}
                            {vehicle.featured && (
                                <div className="absolute top-3 right-3 hidden lg:block">
                                    <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shadow-md">
                                        Featured
                                    </span>
                                </div>
                            )}

                            {/* Image Navigation Arrows (visible on hover for desktop) */}
                            {sortedImages.length > 1 && (
                                <>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden sm:block"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden sm:block"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {sortedImages.length > 1 && (
                            <motion.div variants={fadeInUp} className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                                {sortedImages.map((img, idx) => (
                                    <Button
                                        key={img.id}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-20 p-0 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx
                                            ? 'border-blue-500 ring-2 ring-blue-500/20'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        {/* <img */}
                                        <Image
                                            src={img.url}
                                            alt={img.altText || `View ${idx + 1}`}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                    </Button>
                                ))}
                            </motion.div>
                        )}

                        {/* Description Section (moved to left column for better layout) */}
                        {vehicle.description && (
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800"
                            >
                                <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-3">
                                    <Info className="w-5 h-5 text-blue-500" />
                                    Description
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {vehicle.description}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Column - Details */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="lg:col-span-5 space-y-4 sm:space-y-6"
                    >
                        {/* Title & Price Card (desktop only) */}
                        <motion.div
                            variants={fadeInUp}
                            className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="mb-4">
                                <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white">
                                    {vehicle.yearManufacture} {vehicle.make} {vehicle.model}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">
                                    Stock #: <span className="font-mono font-medium text-gray-700 dark:text-gray-300">{vehicle.stockNumber}</span>
                                </p>
                            </div>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-sm text-gray-500 font-medium">FOB Price:</span>
                                <span className="text-2xl xl:text-3xl font-bold text-green-600">
                                    {formatCurrency(vehicle.priceFob, vehicle.currency)}
                                </span>
                                {vehicle.priceRetail && (
                                    <span className="text-sm text-gray-400 line-through ml-2">
                                        {formatCurrency(vehicle.priceRetail, vehicle.currency)}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <Button className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <CircleDollarSign className="w-5 h-5" />
                                    Buy Now
                                </Button>
                                <Button className="w-full py-3 sm:py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-all active:scale-95">
                                    Make Offer
                                </Button>
                            </div>
                        </motion.div>

                        {/* Mobile Price Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:hidden bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-2xl font-bold text-green-600">
                                    {formatCurrency(vehicle.priceFob, vehicle.currency)}
                                </span>
                                <span className="text-xs text-gray-500">FOB</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <CircleDollarSign className="w-4 h-4" />
                                    Buy Now
                                </Button>
                                <Button className="py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                                    Make Offer
                                </Button>
                            </div>
                        </motion.div>

                        {/* Key Specs Grid */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-2 sm:gap-4">
                            <SpecCard
                                icon={Calendar}
                                label="Year"
                                value={vehicle.yearManufacture}
                                color="blue"
                            />
                            <SpecCard
                                icon={Gauge}
                                label="Mileage"
                                value={vehicle.specs?.mileageKm ? `${vehicle.specs.mileageKm.toLocaleString()} km` : 'N/A'}
                                color="orange"
                            />
                            <SpecCard
                                icon={Zap}
                                label="Engine"
                                value={vehicle.specs?.engineCc ? `${vehicle.specs.engineCc}cc` : vehicle.specs?.engineCode || 'N/A'}
                                color="purple"
                            />
                            <SpecCard
                                icon={Settings}
                                label="Transmission"
                                value={vehicle.specs?.transmission || 'N/A'}
                                color="teal"
                            />
                        </motion.div>

                        {/* Detailed Specs */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white text-sm sm:text-base">
                                    <BadgeInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                    Vehicle Specifications
                                </h3>
                            </div>
                            <div className="p-3 sm:p-4">
                                <DetailRow label="Chassis / VIN" value={vehicle.vinChassis} />
                                <DetailRow label="Drive Type" value={vehicle.specs?.driveType} />
                                <DetailRow label="Fuel Type" value={vehicle.specs?.fuelType} />
                                <DetailRow label="Steering" value={vehicle.specs?.steering || 'Right Hand'} />
                                <DetailRow label="Exterior Color" value={vehicle.specs?.colorExterior} />
                                <DetailRow label="Interior Color" value={vehicle.specs?.colorInterior} />
                                <DetailRow label="Seats" value={vehicle.specs?.seats} />
                                <DetailRow label="Doors" value={vehicle.specs?.doors} />
                                {vehicle.specs?.powerHp && (
                                    <DetailRow label="Power" value={`${vehicle.specs.powerHp} HP`} />
                                )}
                                {vehicle.specs?.weightKg && (
                                    <DetailRow label="Weight" value={`${vehicle.specs.weightKg.toLocaleString()} kg`} />
                                )}
                                {vehicle.specs?.fuelConsumption && (
                                    <DetailRow label="Fuel Consumption" value={vehicle.specs.fuelConsumption} />
                                )}
                                {vehicle.specs?.emissionStandard && (
                                    <DetailRow label="Emission Standard" value={vehicle.specs.emissionStandard} />
                                )}
                            </div>
                        </motion.div>

                        {/* Logistics Info */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white text-sm sm:text-base">
                                    <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                    Logistics & Shipping
                                </h3>
                            </div>
                            <div className="p-3 sm:p-4 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                                {vehicle.logistics?.currentPortName || vehicle.logistics?.currentPortId || 'Japan'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <Navigation className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Origin</p>
                                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                                {vehicle.logistics?.originCountry || 'Japan'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Inspection Status</p>
                                            <p className="font-medium text-green-700 dark:text-green-400">
                                                {vehicle.logistics?.inspectionStatus || 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                    {vehicle.logistics?.inspectionDate && (
                                        <span className="text-xs text-gray-500">
                                            {formatDate(vehicle.logistics.inspectionDate)}
                                        </span>
                                    )}
                                </div>

                                {vehicle.logistics?.etaDestination && (
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">ETA Destination</p>
                                            <p className="font-medium text-blue-700 dark:text-blue-400">
                                                {formatDate(vehicle.logistics.etaDestination)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Vehicle History (if available) */}
                        {vehicle.history && (
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                            >
                                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white text-sm sm:text-base">
                                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                        Vehicle History
                                    </h3>
                                </div>
                                <div className="p-3 sm:p-4">
                                    {vehicle.history.previousOwners !== undefined && (
                                        <DetailRow label="Previous Owners" value={vehicle.history.previousOwners} />
                                    )}
                                    {vehicle.history.serviceHistory !== undefined && (
                                        <DetailRow
                                            label="Service History"
                                            value={vehicle.history.serviceHistory ? 'Available' : 'Not Available'}
                                            highlight={vehicle.history.serviceHistory}
                                        />
                                    )}
                                    {vehicle.history.accidentHistory !== undefined && (
                                        <DetailRow
                                            label="Accident History"
                                            value={vehicle.history.accidentHistory ? 'Yes' : 'No'}
                                            highlight={!vehicle.history.accidentHistory}
                                        />
                                    )}
                                    {vehicle.history.importDate && (
                                        <DetailRow label="Import Date" value={formatDate(vehicle.history.importDate)} />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Documents (if available) */}
                        {vehicle.documents && vehicle.documents.length > 0 && (
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                            >
                                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white text-sm sm:text-base">
                                        <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                        Documents
                                    </h3>
                                </div>
                                <div className="p-3 sm:p-4 space-y-2">
                                    {vehicle.documents.map((doc) => (
                                        <a
                                            key={doc.id}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileCheck className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {doc.title || doc.type}
                                                </span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Additional Info */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 dark:border-blue-800"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Need Help?</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                        Our team is here to assist you with any questions about this vehicle.
                                    </p>
                                    <Button className="text-sm font-medium text-white hover:text-grey-700 dark:text-white dark:hover:text-black-300 transition-colors">
                                        Contact Sales Team →
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </main>

            {/* Image Lightbox */}
            <ImageLightbox
                images={sortedImages}
                currentIndex={activeImageIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
            />
        </div>
    );
}