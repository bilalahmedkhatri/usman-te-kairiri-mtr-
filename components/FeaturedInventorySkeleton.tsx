// components/FeaturedInventorySkeleton.tsx
export function FeaturedInventorySkeleton() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="section-padding">
                <div className="text-center mb-12">
                    <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse" />
                    <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto mt-4 animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}