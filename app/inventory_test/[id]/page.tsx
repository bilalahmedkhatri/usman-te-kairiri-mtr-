import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import VehicleDetailClient, { VehicleDetailData } from '@/app/(dashboard)/dashboard/vehicles/[slug]/VehicleDetailClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VehicleInventoryDetailPage({ params }: PageProps) {
  const vehicleId = parseInt(params.id);

  if (isNaN(vehicleId)) {
    return notFound();
  }

  // Fetch real data from the database with all related fields
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
    include: {
      specs: true,
      logistics: true,
      images: {
        orderBy: {
          isPrimary: 'desc', // Primary images first
        },
      },
      documents: true,
      history: true,
    },
  });

  if (!vehicle) {
    return notFound();
  }

  // Transform data to match client component props with comprehensive field mapping
  const formattedVehicle: VehicleDetailData = {
    // Core vehicle info
    id: vehicle.id,
    stockNumber: vehicle.stockNumber,
    vinChassis: vehicle.vinChassis || 'N/A',
    make: vehicle.make,
    model: vehicle.model,
    yearManufacture: vehicle.yearManufacture,
    yearRegistration: vehicle.yearRegistration || undefined,
    priceFob: Number(vehicle.priceFob),
    priceRetail: vehicle.priceRetail != null ? Number(vehicle.priceRetail) : undefined,
    currency: vehicle.currency || 'JPY',
    status: vehicle.status,
    featured: vehicle.featured,
    description: vehicle.description || undefined,

    // Images with proper ordering
    images: vehicle.images.map(img => ({
      id: img.id,
      url: img.url,
      isPrimary: img.isPrimary,
      altText: img.altText || undefined,
      sortOrder: img.sortOrder || 0,
    })),

    // Comprehensive specs mapping
    specs: vehicle.specs ? {
      engineCode: vehicle.specs.engineCode || undefined,
      engineCc: vehicle.specs.engineCc || undefined,
      fuelType: vehicle.specs.fuelType || undefined,
      transmission: vehicle.specs.transmission || undefined,
      driveType: vehicle.specs.driveType || undefined,
      steering: vehicle.specs.steering || undefined,
      seats: vehicle.specs.seats || undefined,
      doors: vehicle.specs.doors || undefined,
      colorExterior: vehicle.specs.colorExterior || undefined,
      colorInterior: vehicle.specs.colorInterior || undefined,
      mileageKm: vehicle.specs.mileageKm || undefined,
      vehicleType: vehicle.specs.vehicleType || undefined,
      // Additional common spec fields
      powerKw: vehicle.specs.powerKw || undefined,
      powerHp: vehicle.specs.powerHp || undefined,
      torqueNm: vehicle.specs.torqueNm || undefined,
      weightKg: vehicle.specs.weightKg || undefined,
      dimensions: vehicle.specs.dimensions || undefined,
      fuelConsumption: vehicle.specs.fuelConsumption || undefined,
      emissionStandard: vehicle.specs.emissionStandard || undefined,
    } : undefined,

    // Logistics info with extended fields
    logistics: vehicle.logistics ? {
      currentPortId: vehicle.logistics.currentPortId || undefined,
      currentPortName: vehicle.logistics.currentPortName || undefined,
      originCountry: vehicle.logistics.originCountry || undefined,
      originPort: vehicle.logistics.originPort || undefined,
      inspectionStatus: vehicle.logistics.inspectionStatus || undefined,
      inspectionDate: vehicle.logistics.inspectionDate?.toISOString() || undefined,
      etaDestination: vehicle.logistics.etaDestination?.toISOString() || undefined,
      shippingStatus: vehicle.logistics.shippingStatus || undefined,
    } : undefined,

    // Additional data if available
    documents: vehicle.documents?.map(doc => ({
      id: doc.id,
      type: doc.type,
      url: doc.url,
      title: doc.title || undefined,
    })) || [],

    history: vehicle.history ? {
      previousOwners: vehicle.history.previousOwners ? parseInt(vehicle.history.previousOwners) || undefined : undefined,
      serviceHistory: vehicle.history.serviceHistory ? !vehicle.history.serviceHistory.toLowerCase().includes('no') : undefined,
      accidentHistory: vehicle.history.accidentHistory ? !vehicle.history.accidentHistory.toLowerCase().includes('no') : undefined,
      importDate: vehicle.logistics?.importDate?.toISOString() || undefined,
    } : undefined,

    // Metadata
    createdAt: vehicle.createdAt?.toISOString(),
    updatedAt: vehicle.updatedAt?.toISOString(),
  };

  return <VehicleDetailClient vehicle={formattedVehicle} />;
}
