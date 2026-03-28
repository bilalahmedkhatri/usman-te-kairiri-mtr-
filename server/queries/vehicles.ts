// server/queries/vehicles.ts
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { mapVehicleToCar } from '@/server/mappers/vehicleMapper';
import type { Car } from '@/types';

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

export interface SearchVehiclesResult {
    vehicles: Car[];
    totalCount: number;
    page: number;
    totalPages: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
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

/**
 * Search vehicles with filters, sorting and pagination
 */
export async function searchVehicles({
    searchTerm,
    filters = {},
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 12,
}: VehicleSearchParams): Promise<SearchVehiclesResult> {
    const skip = (page - 1) * limit;

    // Build WHERE clause
    const andConditions: Prisma.VehicleWhereInput[] = [
        { status: 'AVAILABLE' }
    ];

    // --- Text search (make, model, description, stockNumber, vinChassis) ---
    if (searchTerm && searchTerm.trim()) {
        const term = searchTerm.trim();
        andConditions.push({
            OR: [
                { make: { contains: term, mode: 'insensitive' } },
                { model: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
                { stockNumber: { contains: term, mode: 'insensitive' } },
                { vinChassis: { contains: term, mode: 'insensitive' } },
            ],
        });
    }

    // Build base WHERE object
    const where: Prisma.VehicleWhereInput = {
        AND: andConditions
    };

    // --- Filters that apply directly to Vehicle fields ---
    if (filters.make) where.make = filters.make;
    if (filters.model) where.model = filters.model;
    
    if (filters.yearMin || filters.yearMax) {
        where.yearManufacture = {};
        if (filters.yearMin) (where.yearManufacture as any).gte = filters.yearMin;
        if (filters.yearMax) (where.yearManufacture as any).lte = filters.yearMax;
    }
    
    if (filters.priceMin || filters.priceMax) {
        where.priceFob = {};
        if (filters.priceMin) (where.priceFob as any).gte = filters.priceMin;
        if (filters.priceMax) (where.priceFob as any).lte = filters.priceMax;
    }

    // --- Filters that relate to VehicleSpecs ---
    const specsFilters: Prisma.VehicleSpecWhereInput = {};

    if (filters.mileageMin || filters.mileageMax) {
        specsFilters.mileageKm = {};
        if (filters.mileageMin) (specsFilters.mileageKm as any).gte = filters.mileageMin;
        if (filters.mileageMax) (specsFilters.mileageKm as any).lte = filters.mileageMax;
    }
    if (filters.fuelType) specsFilters.fuelType = filters.fuelType;
    if (filters.transmission) specsFilters.transmission = filters.transmission;
    if (filters.driveType) specsFilters.driveType = filters.driveType;
    if (filters.color) {
        specsFilters.colorExterior = { contains: filters.color, mode: 'insensitive' };
    }
    if (filters.seats) specsFilters.seats = filters.seats;
    if (filters.doors) specsFilters.doors = filters.doors;
    
    if (filters.engineCcMin || filters.engineCcMax) {
        specsFilters.engineCc = {};
        if (filters.engineCcMin) (specsFilters.engineCc as any).gte = filters.engineCcMin;
        if (filters.engineCcMax) (specsFilters.engineCc as any).lte = filters.engineCcMax;
    }
    if (filters.vehicleType) specsFilters.vehicleType = filters.vehicleType;

    if (Object.keys(specsFilters).length > 0) {
        where.specs = specsFilters;
    }

    // --- Sorting ---
    let orderBy: any = {};
    if (sortBy === 'price') orderBy.priceFob = sortOrder;
    else if (sortBy === 'year') orderBy.yearManufacture = sortOrder;
    else if (sortBy === 'mileage') orderBy = { specs: { mileageKm: sortOrder } };
    else if (sortBy === 'make') orderBy.make = sortOrder;
    else orderBy.createdAt = sortOrder;

    // Execute queries in parallel
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
