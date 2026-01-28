"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { X, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface ImageGalleryProps {
    images: string[];
    alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const mainSwiperRef = useRef<SwiperType | null>(null);
    const lightboxSwiperRef = useRef<SwiperType | null>(null);

    // Keyboard navigation for main gallery
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isLightboxOpen && lightboxSwiperRef.current) {
                if (e.key === "ArrowLeft") {
                    lightboxSwiperRef.current.slidePrev();
                } else if (e.key === "ArrowRight") {
                    lightboxSwiperRef.current.slideNext();
                } else if (e.key === "Escape") {
                    setIsLightboxOpen(false);
                }
            } else if (mainSwiperRef.current && !isLightboxOpen) {
                if (e.key === "ArrowLeft") {
                    mainSwiperRef.current.slidePrev();
                } else if (e.key === "ArrowRight") {
                    mainSwiperRef.current.slideNext();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen]);

    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-[4/3] bg-muted rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">No images available</p>
            </div>
        );
    }

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <div className="space-y-4 w-full max-w-full">
            {/* Main Image Carousel */}
            <div className="relative w-full rounded-xl overflow-hidden bg-black group" style={{ aspectRatio: "4/3", maxHeight: "600px" }}>
                <Swiper
                    onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                    spaceBetween={10}
                    navigation={true}
                    keyboard={{ enabled: true }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    zoom={true}
                    modules={[FreeMode, Navigation, Thumbs, Zoom, Keyboard]}
                    className="h-full w-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container h-full w-full flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={image}
                                        alt={`${alt} - Image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                            {/* Zoom & Fullscreen Buttons */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openLightbox(index)}
                                    className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                                    aria-label="View fullscreen"
                                >
                                    <Maximize2 className="w-5 h-5" />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
                    {images.length} Photos
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        1024: { slidesPerView: 8 },
                    }}
                    className="thumbnail-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="cursor-pointer">
                            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Lightbox Dialog */}
            <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
                <DialogContent className="max-w-screen-2xl w-[95vw] h-[95vh] p-0 bg-black border-0 overflow-hidden">
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/80 backdrop-blur-md rounded-full text-white hover:bg-black transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <Swiper
                        onSwiper={(swiper) => (lightboxSwiperRef.current = swiper)}
                        spaceBetween={10}
                        navigation={true}
                        keyboard={{ enabled: true }}
                        zoom={true}
                        initialSlide={lightboxIndex}
                        modules={[Navigation, Zoom, Keyboard]}
                        className="w-full h-full"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                                    <Image
                                        src={image}
                                        alt={`${alt} - Image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
                        Click image to zoom • Drag to pan
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
