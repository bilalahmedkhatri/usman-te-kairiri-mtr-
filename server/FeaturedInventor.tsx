// app/components/FeaturedInventory.tsx
import { prisma } from '@/lib/prisma';
import { CarCard } from '@/components/cards/CarCard';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { mapVehicleToCar } from '@/lib/mappers/vehicleMapper';

// This is a Server Component - data fetching happens on the server
export default async function FeaturedInventory() {
    // Fetch featured vehicles from database
    const vehicles = await prisma.vehicle.findMany({
        where: {
            status: 'AVAILABLE',
            featured: true,
        },
        include: {
            images: {
                orderBy: {
                    sortOrder: 'asc',
                },
                take: 5, // Get up to 5 images
            },
            specs: true,
            site: {
                select: {
                    name: true,
                    defaultCurrency: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 6, // Only get 6 vehicles for featured section
    });

    // Map database vehicles to the format CarCard expects
    const cars = vehicles.map(mapVehicleToCar);

    // If no featured vehicles, show recent available ones
    if (cars.length === 0) {
        const recentVehicles = await prisma.vehicle.findMany({
            where: { status: 'AVAILABLE' },
            include: {
                images: {
                    orderBy: { sortOrder: 'asc' },
                    take: 5,
                },
                specs: true,
                site: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 6,
        });

        cars.push(...recentVehicles.map(mapVehicleToCar));
    }

    return (
        <section id="inventory" className="w-full py-24 relative overflow-hidden bg-white">
            <div className="w-full section-padding relative">
                {/* Section Header - Centered */}
                <FadeIn className="text-center max-w-3xl mx-auto mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-4 text-gray-900">
                            Premium <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Selection</span>
                        </h2>
                        <p className="text-gray-600 text-base max-w-2xl mx-auto">
                            Hand-picked vehicles from our verified dealer network,
                            featuring the finest Japanese automobiles available for export.
                        </p>
                    </div>
                </FadeIn>

                {/* Car Grid */}
                <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {cars.map((car, index) => (
                        <StaggerItem key={car.id}>
                            <CarCard car={car} index={index} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* View More */}
                <div className="flex justify-center mt-12">
                    <Button
                        size="lg"
                        className="bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-xl px-8 shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                        Browse Full Inventory
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}