"use client";

import { ImageGallery } from "@/components/image-gallery";

export default function ImageGalleryTestPage() {
    // Sample images for testing
    const sampleImages = [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=800",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-heading mb-4">Image Gallery Test</h1>
                    <p className="text-muted-foreground text-lg">
                        Testing Swiper carousel, thumbnails, zoom, and lightbox functionality
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Gallery Features:</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                        <li>✅ Main carousel with navigation arrows</li>
                        <li>✅ Thumbnail strip (click to navigate)</li>
                        <li>✅ Zoom functionality (click image to zoom in/out)</li>
                        <li>✅ Fullscreen lightbox (click maximize icon)</li>
                        <li>✅ Keyboard navigation (← → arrow keys)</li>
                        <li>✅ Escape key to close lightbox</li>
                        <li>✅ Image counter badge</li>
                        <li>✅ Responsive breakpoints</li>
                    </ul>

                    <ImageGallery images={sampleImages} alt="Test Vehicle" />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        🧪 Test Instructions:
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                        <li>Click left/right arrows OR use ← → keyboard keys to navigate</li>
                        <li>Click thumbnails to jump to specific images</li>
                        <li>Click main image to zoom in (click again to zoom out)</li>
                        <li>Click maximize icon (top-right) for fullscreen lightbox</li>
                        <li>In lightbox: zoom, pan, and navigate with arrows or ← → keys</li>
                        <li>Press Escape key to close fullscreen lightbox</li>
                        <li>Test on mobile: swipe gestures should work</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
