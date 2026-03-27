import { Car, Dealer } from '@/types';
import { Prisma } from '@prisma/client';

type VehicleWithRelations = Prisma.VehicleGetPayload<{
  include: {
    images: true;
    specs: true;
    site: {
      select: {
        name: true;
        defaultCurrency: true;
      };
    };
  };
}>;

export function mapVehicleToCar(vehicle: VehicleWithRelations): Car {
  const specs = vehicle.specs;
  
  // Default dealer info based on site
  const dealer: Dealer = {
    id: vehicle.siteId.toString(),
    name: vehicle.site?.name || 'V-Gnal Dealer',
    location: vehicle.site?.name || 'Japan',
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
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.yearManufacture,
    price: Number(vehicle.priceFob),
    originalPrice: vehicle.priceRetail ? Number(vehicle.priceRetail) : undefined,
    mileage: specs?.mileageKm || 0,
    engine: specs?.engineCc ? `${(specs.engineCc / 1000).toFixed(1)}L` : 'N/A',
    transmission: (specs?.transmission as any) || 'Automatic',
    fuel: (specs?.fuelType as any) || 'Gasoline',
    color: specs?.colorExterior || 'N/A',
    location: 'Japan',
    images: vehicle.images.length > 0 ? vehicle.images.map(img => img.url) : ['/images/placeholder-car.jpg'],
    features: (specs?.options as string[]) || [],
    condition: 'Used',
    status: vehicle.status === 'AVAILABLE' ? 'Available' : vehicle.status === 'SOLD' ? 'Sold' : 'Reserved',
    rating: 4.9,
    reviews: 12,
    badge: vehicle.featured ? 'Featured' : undefined,
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
