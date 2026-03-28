// app/(marketing)/inventory/page.tsx
import { searchVehicles } from '@/server/queries/vehicles';
import { VehicleFiltersClient } from '@/components/VehicleFiltersClient';
import { VehicleGrid } from '@/components/VehicleGrid';
import { Pagination } from '@/components/Pagination';
import { SortDropdown } from '@/components/SortDropdown';
import { Suspense } from 'react';
import { VehicleGridSkeleton } from '@/components/VehicleGridSkeleton';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function InventoryPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const params = await searchParams;

    // Parse search parameters with proper types
    const searchTerm = typeof params.q === 'string' ? params.q : undefined;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const sortBy = typeof params.sort === 'string' ? (params.sort as any) : 'createdAt';
    const sortOrder = typeof params.order === 'string' && params.order === 'asc' ? 'asc' : 'desc';

    // Parse filters
    const make = typeof params.make === 'string' ? params.make : undefined;
    const model = typeof params.model === 'string' ? params.model : undefined;
    const yearMin = typeof params.yearMin === 'string' ? parseInt(params.yearMin) : undefined;
    const yearMax = typeof params.yearMax === 'string' ? parseInt(params.yearMax) : undefined;
    const priceMin = typeof params.priceMin === 'string' ? parseFloat(params.priceMin) : undefined;
    const priceMax = typeof params.priceMax === 'string' ? parseFloat(params.priceMax) : undefined;
    const mileageMin = typeof params.mileageMin === 'string' ? parseInt(params.mileageMin) : undefined;
    const mileageMax = typeof params.mileageMax === 'string' ? parseInt(params.mileageMax) : undefined;
    const fuelType = typeof params.fuel === 'string' ? params.fuel : undefined;
    const transmission = typeof params.trans === 'string' ? params.trans : undefined;
    const driveType = typeof params.drive === 'string' ? params.drive : undefined;
    const color = typeof params.color === 'string' ? params.color : undefined;
    const seats = typeof params.seats === 'string' ? parseInt(params.seats) : undefined;
    const doors = typeof params.doors === 'string' ? parseInt(params.doors) : undefined;
    const engineCcMin = typeof params.engineMin === 'string' ? parseInt(params.engineMin) : undefined;
    const engineCcMax = typeof params.engineMax === 'string' ? parseInt(params.engineMax) : undefined;
    const vehicleType = typeof params.type === 'string' ? params.type : undefined;

    const { vehicles, totalCount, page: currentPage, totalPages } = await searchVehicles({
        searchTerm,
        filters: {
            make,
            model,
            yearMin,
            yearMax,
            priceMin,
            priceMax,
            mileageMin,
            mileageMax,
            fuelType,
            transmission,
            driveType,
            color,
            seats,
            doors,
            engineCcMin,
            engineCcMax,
            vehicleType,
        },
        sortBy,
        sortOrder,
        page: page > 0 ? page : 1,
        limit: 12,
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar with filters */}
                <aside className="w-full lg:w-80 shrink-0">
                    <VehicleFiltersClient
                        currentFilters={{
                            q: searchTerm,
                            make,
                            model,
                            yearMin,
                            yearMax,
                            priceMin,
                            priceMax,
                            mileageMin,
                            mileageMax,
                            fuel: fuelType,
                            trans: transmission,
                            drive: driveType,
                            color,
                            seats,
                            doors,
                            engineMin: engineCcMin,
                            engineMax: engineCcMax,
                            type: vehicleType,
                            sort: sortBy,
                            order: sortOrder,
                        }}
                    />
                </aside>

                {/* Main content */}
                <main className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <p className="text-gray-600">
                            {totalCount} vehicle{totalCount !== 1 ? 's' : ''} found
                        </p>
                        <SortDropdown currentSort={sortBy} currentOrder={sortOrder} />
                    </div>

                    <Suspense fallback={<VehicleGridSkeleton count={12} />}>
                        {vehicles.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No vehicles match your criteria.</p>
                            </div>
                        ) : (
                            <>
                                <VehicleGrid vehicles={vehicles} />
                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        basePath="/inventory"
                                        queryParams={params}
                                    />
                                )}
                            </>
                        )}
                    </Suspense>
                </main>
            </div>
        </div>
    );
}