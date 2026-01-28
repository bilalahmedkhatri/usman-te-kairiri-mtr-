"use client";

import { useComparison } from "@/lib/store/comparison-store";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/lib/api";
import toast from "react-hot-toast";

interface CompareButtonProps {
    vehicle: Vehicle;
    className?: string;
}

export function CompareButton({ vehicle, className }: CompareButtonProps) {
    const { vehicles, addVehicle, removeVehicle, isInComparison } = useComparison();
    const inComparison = isInComparison(vehicle.id);

    const handleClick = () => {
        if (inComparison) {
            removeVehicle(vehicle.id);
            toast.success("Removed from comparison");
        } else {
            addVehicle(vehicle);
            if (vehicles.length >= 4) {
                toast("Comparing 5+ vehicles may affect readability", {
                    icon: "⚠️",
                    duration: 4000,
                });
            } else {
                toast.success("Added to comparison");
            }
        }
    };

    return (
        <Button
            variant={inComparison ? "default" : "outline"}
            size="sm"
            onClick={handleClick}
            className={cn("gap-2", className)}
        >
            {inComparison ? (
                <>
                    <Check className="w-4 h-4" /> In Comparison
                </>
            ) : (
                <>
                    Compare
                </>
            )}
        </Button>
    );
}
