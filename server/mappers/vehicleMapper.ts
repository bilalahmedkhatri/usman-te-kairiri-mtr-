import type { Car, Dealer } from '@/types';

export function mapVehicleToCar(vehicle: any): Car {
    const specs = vehicle.specs;
    
    const primaryImage = vehicle.images?.find((img: any) => img.isPrimary)?.url ||
        vehicle.images?.[0]?.url ||
        '/images/placeholder-car.jpg';
    
    const allImages = vehicle.images?.map((img: any) => img.url) || [primaryImage];

    // Example: calculate rating from dealer profile if available
    const rating = vehicle.site?.dealerProfile?.rating ?? 4.8;
    const reviews = vehicle.site?.dealerProfile?.totalSales ?? 124;

    let badge: string | undefined;
    if (specs?.mileageKm && specs.mileageKm < 50000) {
        badge = 'Low Mileage';
    } else if (vehicle.featured) {
        badge = 'Featured';
    }

    const dealer: Dealer = {
        id: vehicle.siteId?.toString() || '1',
        name: vehicle.site?.name || 'V-Gnal Dealer',
        location: 'Japan',
        rating: 4.8,
        totalReviews: 124,
        verified: true,
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=256&h=256&auto=format&fit=crop',
        specialty: ['Japanese Imports', 'Luxury Sedans'],
        contact: {
            phone: '+81-3-1234-5678',
            email: 'info@v-gnal.com',
            website: 'https://v-gnal.com'
        }
    };

    return {
        id: vehicle.id.toString(),
        stockNumber: vehicle.stockNumber,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.yearManufacture,
        price: Number(vehicle.priceFob),
        originalPrice: vehicle.priceRetail ? Number(vehicle.priceRetail) : undefined,
        mileage: specs?.mileageKm ?? 0,
        engine: specs?.engineCode
            ? `${specs.engineCode} ${specs.engineCc ? `${specs.engineCc}cc` : ''}`.trim()
            : `${specs?.engineCc ?? '?'}cc`,
        transmission: specs?.transmission ?? 'Automatic',
        fuel: specs?.fuelType ?? 'Gasoline',
        color: specs?.colorExterior ?? 'N/A',
        location: 'Japan',
        images: allImages,
        features: (specs?.options as string[]) || [],
        condition: 'Used',
        status: vehicle.status === 'AVAILABLE' ? 'Available' : vehicle.status === 'SOLD' ? 'Sold' : 'Reserved',
        rating,
        reviews,
        badge,
        description: vehicle.description || undefined,
        dealer: dealer,
        specs: [
            { label: 'Engine', value: specs?.engineCc ? `${specs.engineCc}cc` : 'N/A' },
            { label: 'Transmission', value: specs?.transmission || 'N/A' },
            { label: 'Drive', value: specs?.driveType || 'N/A' },
            { label: 'Color', value: specs?.colorExterior || 'N/A' }
        ]
    };
}
