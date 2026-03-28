// app/(marketing)/inventory/loading.tsx
import { VehicleGridSkeleton } from "@/components/VehicleGridSkeleton";

export default function InventoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="h-10 bg-gray-100 rounded-xl animate-pulse w-1/2 mb-8" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
              <div className="h-10 bg-gray-50 rounded-lg animate-pulse" />
            </div>
          ))}
        </aside>

        {/* Main content Skeleton */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <div className="h-6 bg-gray-100 rounded w-32 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded-lg w-48 animate-pulse" />
          </div>

          <VehicleGridSkeleton count={9} />
        </main>
      </div>
    </div>
  );
}
