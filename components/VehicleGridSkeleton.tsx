// components/VehicleGridSkeleton.tsx
export function VehicleGridSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-gray-200" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                        <div className="h-8 w-24 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}