"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { vehicleApi, ShippingCalculation } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";
import { Loader2 } from "lucide-react";

interface ShippingCalculatorProps {
  vehicleId: string;
}

export function ShippingCalculator({ vehicleId }: ShippingCalculatorProps) {
  const [shippingPort, setShippingPort] = useState("");
  const [calculation, setCalculation] = useState<ShippingCalculation | null>(
    null
  );

  const { mutate: calculateShipping, isPending } = useMutation({
    mutationFn: (port: string) =>
      vehicleApi.calculateShipping(vehicleId, port),
    onSuccess: (data) => {
      setCalculation(data);
    },
    onError: (error) => {
      console.error("Error calculating shipping:", error);
      alert("Failed to calculate shipping. Please try again.");
    },
  });

  const handleCalculate = () => {
    if (!shippingPort.trim()) {
      alert("Please enter a shipping port");
      return;
    }
    calculateShipping(shippingPort);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Shipping (C&F)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="shipping-port">Shipping Port</Label>
          <Input
            id="shipping-port"
            placeholder="e.g., Port of Los Angeles, Port of New York"
            value={shippingPort}
            onChange={(e) => setShippingPort(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCalculate();
              }
            }}
          />
        </div>

        <Button
          onClick={handleCalculate}
          disabled={isPending || !shippingPort.trim()}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Shipping"
          )}
        </Button>

        {calculation && (
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping Cost:</span>
              <span className="font-semibold">
                {formatCurrency(calculation.shipping_cost)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total Price (C&F):</span>
              <span className="text-primary">
                {formatCurrency(calculation.total_price)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
