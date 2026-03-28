// server/queries/vehicles.ts
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { mapVehicleToCar } from '@/server/mappers/vehicleMapper';
import type { Car } from '@/types';

/**
 * Search vehicles with filters, sorting and pagination
 */
// server/queries/vehicles.ts

export interface VehicleSearchParams {
    searchTerm?: string;
    filters?: {
        make?: string;
        model?: string;
        yearMin?: number;
        yearMax?: number;
        priceMin?: number;
        priceMax?: number;
        mileageMin?: number;
        mileageMax?: number;
        fuelType?: string;
        transmission?: string;
        driveType?: string;
        color?: string;
        seats?: number;
        doors?: number;
        engineCcMin?: number;
        engineCcMax?: number;
        vehicleType?: string;
    };
    sortBy?: 'price' | 'year' | 'mileage' | 'createdAt' | 'make';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export async function searchVehicles({
    searchTerm,
    filters = {},
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 12,
}: VehicleSearchParams) {
    const skip = (page - 1) * limit;

    // Build WHERE clause
    const where: Prisma.VehicleWhereInput = {
        status: 'AVAILABLE', // Only show available vehicles
    };

    const conditions: Prisma.VehicleWhereInput[] = [];

    // --- Text search ---
    if (searchTerm && searchTerm.trim()) {
        const term = searchTerm.trim();
        conditions.push({
            OR: [
                { make: { contains: term, mode: 'insensitive' } },
                { model: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
                { stockNumber: { contains: term, mode: 'insensitive' } },
                { vinChassis: { contains: term, mode: 'insensitive' } },
            ],
        });
    }

    // --- Direct vehicle filters ---
    if (filters.make) {
        conditions.push({ make: filters.make });
    }
    if (filters.model) {
        conditions.push({ model: { contains: filters.model, mode: 'insensitive' } });
    }
    if (filters.yearMin !== undefined || filters.yearMax !== undefined) {
        conditions.push({
            yearManufacture: {
                ...(filters.yearMin !== undefined && { gte: filters.yearMin }),
                ...(filters.yearMax !== undefined && { lte: filters.yearMax }),
            },
        });
    }
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        conditions.push({
            priceFob: {
                ...(filters.priceMin !== undefined && { gte: filters.priceMin }),
                ...(filters.priceMax !== undefined && { lte: filters.priceMax }),
            },
        });
    }

    // --- VehicleSpec filters ---
    const specsConditions: Prisma.VehicleSpecWhereInput = {};

    if (filters.mileageMin !== undefined || filters.mileageMax !== undefined) {
        specsConditions.mileageKm = {
            ...(filters.mileageMin !== undefined && { gte: filters.mileageMin }),
            ...(filters.mileageMax !== undefined && { lte: filters.mileageMax }),
        };
    }
    if (filters.fuelType) specsConditions.fuelType = filters.fuelType;
    if (filters.transmission) specsConditions.transmission = filters.transmission;
    if (filters.driveType) specsConditions.driveType = filters.driveType;
    if (filters.color) {
        specsConditions.colorExterior = { contains: filters.color, mode: 'insensitive' };
    }
    if (filters.seats !== undefined) specsConditions.seats = filters.seats;
    if (filters.doors !== undefined) specsConditions.doors = filters.doors;
    if (filters.engineCcMin !== undefined || filters.engineCcMax !== undefined) {
        specsConditions.engineCc = {
            ...(filters.engineCcMin !== undefined && { gte: filters.engineCcMin }),
            ...(filters.engineCcMax !== undefined && { lte: filters.engineCcMax }),
        };
    }
    if (filters.vehicleType) specsConditions.vehicleType = filters.vehicleType;

    if (Object.keys(specsConditions).length > 0) {
        conditions.push({ specs: specsConditions });
    }

    // Apply all conditions
    if (conditions.length > 0) {
        where.AND = conditions;
    }

    // --- Sorting ---
    let orderBy: Prisma.VehicleOrderByWithRelationInput = {};
    switch (sortBy) {
        case 'price':
            orderBy = { priceFob: sortOrder };
            break;
        case 'year':
            orderBy = { yearManufacture: sortOrder };
            break;
        case 'mileage':
            orderBy = { specs: { mileageKm: sortOrder } };
            break;
        case 'make':
            orderBy = { make: sortOrder };
            break;
        default:
            orderBy = { createdAt: sortOrder };
    }

    // Execute parallel queries
    const [vehicles, totalCount] = await Promise.all([
        prisma.vehicle.findMany({
            where,
            include: {
                images: { orderBy: { sortOrder: 'asc' }, take: 5 },
                specs: true,
                site: { select: { name: true, defaultCurrency: true } },
            },
            orderBy,
            skip,
            take: limit,
        }),
        prisma.vehicle.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        vehicles: vehicles.map(mapVehicleToCar),
        totalCount,
        page,
        totalPages,
        limit,
        sortBy,
        sortOrder,
    };
}

/**
 * Get featured vehicles for the homepage
 * @param limit - Number of vehicles to return (default 6)
 * @returns Array of mapped Car objects ready for UI
 */
export async function getFeaturedVehicles(limit: number = 6): Promise<Car[]> {
    const vehicles = await prisma.vehicle.findMany({
        where: {
            status: 'AVAILABLE',
            featured: true,
        },
        include: {
            images: {
                orderBy: { sortOrder: 'asc' },
                take: 5, // enough for gallery
            },
            specs: true,
            site: {
                select: {
                    name: true,
                    defaultCurrency: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });

    if (vehicles.length === 0) {
        // Fallback to any available vehicles
        const recent = await prisma.vehicle.findMany({
            where: { status: 'AVAILABLE' },
            include: {
                images: { orderBy: { sortOrder: 'asc' }, take: 5 },
                specs: true,
                site: { select: { name: true, defaultCurrency: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return recent.map(mapVehicleToCar);
    }

    return vehicles.map(mapVehicleToCar);
}

/**
 * Get a single vehicle by ID
 */
export async function getVehicleById(id: number) {
    return prisma.vehicle.findUnique({
        where: { id },
        include: {
            images: { orderBy: { sortOrder: 'asc' } },
            specs: true,
            logistics: true,
            documents: true,
            history: true,
            site: true,
        },
    });
}

