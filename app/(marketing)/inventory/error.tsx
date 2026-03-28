"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function InventoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Inventory Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Inventory Search Failed</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We encountered a problem while searching for vehicles. This could be a temporary connection issue.
      </p>

      <div className="flex gap-4">
        <Button 
          onClick={reset}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-8"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => window.location.reload()}
          className="rounded-xl px-8"
        >
          Refresh Page
        </Button>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-12 p-4 bg-gray-50 rounded-lg text-left text-xs font-mono text-red-800 overflow-auto max-w-full">
          {error.message}
          {error.stack}
        </pre>
      )}
    </div>
  );
}
