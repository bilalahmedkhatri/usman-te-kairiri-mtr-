import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, ArrowLeft } from "lucide-react";

export default function InventoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-gray-400" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">No Vehicles Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn&apos;t find the specific inventory section you were looking for. 
        Try browsing our full collection or adjusting your filters.
      </p>

      <Link href="/inventory">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Full Inventory
        </Button>
      </Link>
    </div>
  );
}
