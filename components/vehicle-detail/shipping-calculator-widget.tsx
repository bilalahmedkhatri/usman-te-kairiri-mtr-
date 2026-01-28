"use client";

import { useState, useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Ship, ShieldCheck, SearchCheck } from "lucide-react";
import { formatCurrency } from "@/lib/format";

// Mock Data for Shipping Rates
// Real app would fetch this from an API
const SHIPPING_RATES: Record<string, { port: string; ratePerM3: number; inspectionFee: number; insuranceRate: number }[]> = {
    "Africa": [
        { port: "Mombasa, Kenya", ratePerM3: 130, inspectionFee: 350, insuranceRate: 0.02 },
        { port: "Dar es Salaam, Tanzania", ratePerM3: 130, inspectionFee: 350, insuranceRate: 0.02 },
        { port: "Durban, South Africa", ratePerM3: 110, inspectionFee: 300, insuranceRate: 0.015 },
    ],
    "Asia": [
        { port: "Karachi, Pakistan", ratePerM3: 100, inspectionFee: 250, insuranceRate: 0.015 },
        { port: "Colombo, Sri Lanka", ratePerM3: 90, inspectionFee: 250, insuranceRate: 0.015 },
        { port: "Yangon, Myanmar", ratePerM3: 110, inspectionFee: 300, insuranceRate: 0.02 },
    ],
    "Caribbean": [
        { port: "Kingston, Jamaica", ratePerM3: 160, inspectionFee: 400, insuranceRate: 0.025 },
        { port: "Nassau, Bahamas", ratePerM3: 155, inspectionFee: 400, insuranceRate: 0.025 },
    ],
    "Oceania": [
        { port: "Auckland, New Zealand", ratePerM3: 120, inspectionFee: 450, insuranceRate: 0.02 },
        { port: "Brisbane, Australia", ratePerM3: 125, inspectionFee: 500, insuranceRate: 0.02 },
    ],
    "Europe": [
        { port: "Southampton, UK", ratePerM3: 140, inspectionFee: 400, insuranceRate: 0.02 },
        { port: "Dublin, Ireland", ratePerM3: 145, inspectionFee: 400, insuranceRate: 0.02 },
        { port: "Limassol, Cyprus", ratePerM3: 135, inspectionFee: 350, insuranceRate: 0.02 },
    ]
};

interface ShippingCalculatorWidgetProps {
    vehiclePrice: number;
    vehicleM3?: number; // Cubic meters volume
}

export function ShippingCalculatorWidget({ vehiclePrice, vehicleM3 = 14 }: ShippingCalculatorWidgetProps) {
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [selectedPort, setSelectedPort] = useState<string>("");

    const availablePorts = useMemo(() => {
        return selectedRegion ? SHIPPING_RATES[selectedRegion] : [];
    }, [selectedRegion]);

    const calculation = useMemo(() => {
        if (!selectedRegion || !selectedPort) return null;

        const rate = SHIPPING_RATES[selectedRegion].find(r => r.port === selectedPort);
        if (!rate) return null;

        const freightCost = vehicleM3 * rate.ratePerM3;
        const insuranceCost = vehiclePrice * rate.insuranceRate;
        const inspectionCost = rate.inspectionFee;
        const totalCIF = vehiclePrice + freightCost + insuranceCost + inspectionCost;

        return {
            freight: freightCost,
            insurance: insuranceCost,
            inspection: inspectionCost,
            total: totalCIF,
            details: rate
        };
    }, [selectedRegion, selectedPort, vehiclePrice, vehicleM3]);

    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Calculate Shipping (CIF)</h3>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">Destination Region</Label>
                    <Select onValueChange={(val) => { setSelectedRegion(val); setSelectedPort(""); }}>
                        <SelectTrigger className="bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(SHIPPING_RATES).map(region => (
                                <NavItem key={region} value={region}>{region}</NavItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedRegion && (
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Destination Port</Label>
                        <Select onValueChange={setSelectedPort} value={selectedPort}>
                            <SelectTrigger className="bg-white dark:bg-slate-900">
                                <SelectValue placeholder="Select Port" />
                            </SelectTrigger>
                            <SelectContent>
                                {availablePorts.map(rate => (
                                    <NavItem key={rate.port} value={rate.port}>{rate.port}</NavItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {calculation && (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Separator className="bg-slate-200 dark:bg-slate-600" />

                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <div className="flex justify-between">
                                <span>Vehicle Price (FOB)</span>
                                <span className="font-medium">{formatCurrency(vehiclePrice)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5"><Ship className="w-3.5 h-3.5" /> Freight ({vehicleM3}m³)</span>
                                <span className="font-medium">{formatCurrency(calculation.freight)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Marine Insurance</span>
                                <span className="font-medium">{formatCurrency(calculation.insurance)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5"><SearchCheck className="w-3.5 h-3.5" /> Inspection</span>
                                <span className="font-medium">{formatCurrency(calculation.inspection)}</span>
                            </div>
                        </div>

                        <Separator className="bg-slate-200 dark:bg-slate-600" />

                        <div className="flex justify-between items-end pt-1">
                            <div>
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">Total CIF Price</span>
                                <span className="text-xs text-muted-foreground">To {selectedPort}</span>
                            </div>
                            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-heading">
                                {formatCurrency(calculation.total)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to fix the SelectItem type issue in the loop
function NavItem({ value, children }: { value: string, children: React.ReactNode }) {
    return <SelectItem value={value}>{children}</SelectItem>
}
