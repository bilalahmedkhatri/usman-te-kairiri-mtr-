import { prisma } from '@/lib/prisma';
import VehiclesClient, { VehicleData } from './VehiclesClient';

// This is a Server Component that fetches data from the database
export default async function VehiclesPage() {

  // Fetch vehicles with related specs, logistics, and images
  const vehicles = await prisma.vehicle.findMany({
    include: {
      specs: true,
      logistics: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform the data to match the VehicleData interface
  const formattedVehicles: VehicleData[] = vehicles.map((vehicle) => {
    // Find primary image, or fallback to first image, or null
    const primaryImage = vehicle.images.find(img => img.isPrimary) || vehicle.images[0];

    // Generate a semantic slug: make-model-year-id
    const slug = `${vehicle.make.toLowerCase().replace(/\s+/g, '-')}-${vehicle.model.toLowerCase().replace(/\s+/g, '-')}-${vehicle.yearManufacture}-${vehicle.id}`;

    return {
      id: vehicle.id,
      slug,
      stockNumber: vehicle.stockNumber,
      vinChassis: vehicle.vinChassis || '',
      make: vehicle.make,
      model: vehicle.model,
      yearManufacture: vehicle.yearManufacture,
      priceFob: Number(vehicle.priceFob), // Convert Decimal to Number
      status: vehicle.status, // Enum value
      colorExterior: vehicle.specs?.colorExterior || '',
      mileageKm: vehicle.specs?.mileageKm || 0,
      currentPort: vehicle.logistics?.currentPortId || '',
      imageUrl: primaryImage?.url || undefined,
    };
  });

  return <VehiclesClient initialVehicles={formattedVehicles} />;
}