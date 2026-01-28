"use client";

import { useState } from "react";
import { AdvancedFilters } from "@/components/advanced-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FiltersTestPage() {
    const [activeFilters, setActiveFilters] = useState<any>(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-heading mb-4">Advanced Filters Test</h1>
                <p className="text-muted-foreground text-lg">
                    Testing filter checkboxes, range slider, and mobile sheet functionality
                </p>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                {/* Filters Sidebar */}
                <div>
                    <AdvancedFilters onFilterChange={setActiveFilters} />
                </div>

                {/* Results Display */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filter State (Live Preview)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
                                {JSON.stringify(activeFilters, null, 2) || "No filters applied"}
                            </pre>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>🧪 Test Instructions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Desktop (≥1024px):</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>Filters should appear in left sidebar</li>
                                    <li>Check/uncheck transmission options</li>
                                    <li>Select multiple fuel types</li>
                                    <li>Drag mileage slider (dual thumbs)</li>
                                    <li>Select condition checkboxes</li>
                                    <li>Toggle feature checkboxes (grid layout)</li>
                                    <li>Click "Clear All Filters" to reset</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Mobile (&lt;1024px):</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>Filters should show as "Filters" button</li>
                                    <li>Click button to open slide-in sheet from left</li>
                                    <li>All filters accessible in scrollable sheet</li>
                                    <li>Active filter count badge on button</li>
                                    <li>Close sheet with X or by clicking outside</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    Expected Behavior:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-xs text-blue-800 dark:text-blue-200">
                                    <li>Filter state updates immediately above</li>
                                    <li>Active filter count badge updates</li>
                                    <li>Mileage displays as "Xk - Yk km"</li>
                                    <li>Clear button disabled when no filters active</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                            ✅ Filter Options Available:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
                            <div>
                                <strong>Transmission:</strong> Automatic, Manual, CVT, Semi-Automatic
                            </div>
                            <div>
                                <strong>Fuel Type:</strong> Petrol, Diesel, Hybrid, Electric, LPG
                            </div>
                            <div>
                                <strong>Mileage:</strong> 0 - 200,000 km (slider)
                            </div>
                            <div>
                                <strong>Condition:</strong> Excellent, Good, Fair
                            </div>
                            <div className="md:col-span-2">
                                <strong>Features:</strong> Sunroof, Leather Seats, Navigation, Backup Camera, Heated Seats, Bluetooth, Cruise Control, Alloy Wheels
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
