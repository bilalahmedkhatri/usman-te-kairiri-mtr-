'use server'

import { prisma } from '@/lib/prisma'

export interface HeroCar {
    id: number;
    make: string;
    model: string;
    year: number;
    images: string[];
}

export async function getHeroCars(): Promise<HeroCar[]> {
    try {
        const cars = await prisma.vehicle.findMany({
            where: {
                featured: true,
                status: 'AVAILABLE',
            },
            take: 3,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                images: {
                    orderBy: {
                        sortOrder: 'asc'
                    }
                }
            }
        });

        if (cars.length === 0) {
            return [];
        }

        return cars.map(car => {
            // Collect URLs, prioritizing primary if strictly sorted, 
            // but here we just take all images.
            const imageUrls = car.images.map(img => img.url);

            // If no images, we might want to provide a placeholder or skip?
            // User asked to add images if not present. I did that in seed.
            // If still empty, UI should handle it.

            return {
                id: car.id,
                make: car.make,
                model: car.model,
                year: car.yearManufacture,
                images: imageUrls.length > 0 ? imageUrls : ['https://placehold.co/600x400?text=No+Image'],
            };
        });

    } catch (error) {
        console.error('Failed to fetch hero cars:', error);
        return [];
    }
}
