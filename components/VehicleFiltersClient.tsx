// components/VehicleFiltersClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { X } from 'lucide-react';

interface Filters {
    q?: string;
    make?: string;
    model?: string;
    yearMin?: number;
    yearMax?: number;
    priceMin?: number;
    priceMax?: number;
    mileageMin?: number;
    mileageMax?: number;
    fuel?: string;
    trans?: string;
    drive?: string;
    color?: string;
    seats?: number;
    doors?: number;
    engineMin?: number;
    engineMax?: number;
    type?: string;
    sort?: string;
    order?: string;
}

interface VehicleFiltersClientProps {
    currentFilters: Filters;
}

// Predefined lists (these can be fetched dynamically later)
const makes = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Suzuki', 'Mitsubishi', 'Lexus', 'Acura', 'Infiniti'];
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const transmissions = ['Manual', 'Automatic', 'CVT'];
const driveTypes = ['FWD', 'RWD', 'AWD', '4WD'];
const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Brown'];
const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck'];

export function VehicleFiltersClient({ currentFilters }: VehicleFiltersClientProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Local state for form values
    const [searchTerm, setSearchTerm] = useState(currentFilters.q || '');
    const [make, setMake] = useState(currentFilters.make || '');
    const [model, setModel] = useState(currentFilters.model || '');
    const [yearRange, setYearRange] = useState<[number, number]>([
        currentFilters.yearMin || 1990,
        currentFilters.yearMax || new Date().getFullYear(),
    ]);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        currentFilters.priceMin || 0,
        currentFilters.priceMax || 100000,
    ]);
    const [mileageRange, setMileageRange] = useState<[number, number]>([
        currentFilters.mileageMin || 0,
        currentFilters.mileageMax || 200000,
    ]);
    const [fuel, setFuel] = useState(currentFilters.fuel || '');
    const [transmission, setTransmission] = useState(currentFilters.trans || '');
    const [drive, setDrive] = useState(currentFilters.drive || '');
    const [color, setColor] = useState(currentFilters.color || '');
    const [seats, setSeats] = useState(currentFilters.seats?.toString() || '');
    const [doors, setDoors] = useState(currentFilters.doors?.toString() || '');
    const [engineMin, setEngineMin] = useState(currentFilters.engineMin?.toString() || '');
    const [engineMax, setEngineMax] = useState(currentFilters.engineMax?.toString() || '');
    const [vehicleType, setVehicleType] = useState(currentFilters.type || '');

    // Build URL with current filters
    const updateUrl = () => {
        const params = new URLSearchParams();

        if (searchTerm) params.set('q', searchTerm);
        if (make && make !== 'all') params.set('make', make);
        if (model) params.set('model', model);
        if (yearRange[0] > 1990) params.set('yearMin', yearRange[0].toString());
        if (yearRange[1] < new Date().getFullYear()) params.set('yearMax', yearRange[1].toString());
        if (priceRange[0] > 0) params.set('priceMin', priceRange[0].toString());
        if (priceRange[1] < 100000) params.set('priceMax', priceRange[1].toString());
        if (mileageRange[0] > 0) params.set('mileageMin', mileageRange[0].toString());
        if (mileageRange[1] < 200000) params.set('mileageMax', mileageRange[1].toString());
        if (fuel) params.set('fuel', fuel);
        if (transmission) params.set('trans', transmission);
        if (drive) params.set('drive', drive);
        if (color) params.set('color', color);
        if (seats) params.set('seats', seats);
        if (doors) params.set('doors', doors);
        if (engineMin) params.set('engineMin', engineMin);
        if (engineMax) params.set('engineMax', engineMax);
        if (vehicleType) params.set('type', vehicleType);

        // Preserve sorting if present in currentFilters
        if (currentFilters.sort) params.set('sort', currentFilters.sort);
        if (currentFilters.order) params.set('order', currentFilters.order);

        router.push(`${pathname}?${params.toString()}`);
    };

    // Debounced update
    useEffect(() => {
        const timer = setTimeout(updateUrl, 500);
        return () => clearTimeout(timer);
    }, [
        searchTerm,
        make,
        model,
        yearRange,
        priceRange,
        mileageRange,
        fuel,
        transmission,
        drive,
        color,
        seats,
        doors,
        engineMin,
        engineMax,
        vehicleType,
    ]);

    const clearFilters = () => {
        setSearchTerm('');
        setMake('');
        setModel('');
        setYearRange([1990, new Date().getFullYear()]);
        setPriceRange([0, 100000]);
        setMileageRange([0, 200000]);
        setFuel('');
        setTransmission('');
        setDrive('');
        setColor('');
        setSeats('');
        setDoors('');
        setEngineMin('');
        setEngineMax('');
        setVehicleType('');
        router.push(pathname);
    };

    return (
        <div className="space-y-6 bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                    <X className="w-4 h-4 mr-1" /> Clear all
                </Button>
            </div>

            {/* Search */}
            <div>
                <Label htmlFor="search">Search</Label>
                <Input
                    id="search"
                    placeholder="Make, model, stock #..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Accordion type="multiple" defaultValue={['details', 'price', 'year', 'mileage']}>
                {/* Vehicle Details */}
                <AccordionItem value="details">
                    <AccordionTrigger>Vehicle Details</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div>
                            <Label>Make</Label>
                            <Select value={make} onValueChange={setMake}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any make" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any make</SelectItem>
                                    {makes.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Model</Label>
                            <Input
                                placeholder="Model name"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Vehicle Type</Label>
                            <Select value={vehicleType} onValueChange={setVehicleType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any type</SelectItem>
                                    {vehicleTypes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Color</Label>
                            <Select value={color} onValueChange={setColor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any color</SelectItem>
                                    {colors.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>Seats</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g., 5"
                                    value={seats}
                                    onChange={(e) => setSeats(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Doors</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g., 4"
                                    value={doors}
                                    onChange={(e) => setDoors(e.target.value)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price (FOB USD)</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4">
                            <Slider
                                min={0}
                                max={100000}
                                step={1000}
                                value={priceRange}
                                onValueChange={(val) => setPriceRange(val as [number, number])}
                            />
                            <div className="flex justify-between mt-2 text-sm">
                                <span>${priceRange[0].toLocaleString()}</span>
                                <span>${priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Year */}
                <AccordionItem value="year">
                    <AccordionTrigger>Year</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4">
                            <Slider
                                min={1990}
                                max={new Date().getFullYear()}
                                step={1}
                                value={yearRange}
                                onValueChange={(val) => setYearRange(val as [number, number])}
                            />
                            <div className="flex justify-between mt-2 text-sm">
                                <span>{yearRange[0]}</span>
                                <span>{yearRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Mileage */}
                <AccordionItem value="mileage">
                    <AccordionTrigger>Mileage (km)</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4">
                            <Slider
                                min={0}
                                max={200000}
                                step={5000}
                                value={mileageRange}
                                onValueChange={(val) => setMileageRange(val as [number, number])}
                            />
                            <div className="flex justify-between mt-2 text-sm">
                                <span>{mileageRange[0].toLocaleString()} km</span>
                                <span>{mileageRange[1].toLocaleString()} km</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Engine */}
                <AccordionItem value="engine">
                    <AccordionTrigger>Engine</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div>
                            <Label>Fuel Type</Label>
                            <Select value={fuel} onValueChange={setFuel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any fuel" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any fuel</SelectItem>
                                    {fuelTypes.map((f) => (
                                        <SelectItem key={f} value={f}>
                                            {f}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Transmission</Label>
                            <Select value={transmission} onValueChange={setTransmission}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any transmission" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any transmission</SelectItem>
                                    {transmissions.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Drive Type</Label>
                            <Select value={drive} onValueChange={setDrive}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Any drive" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any drive</SelectItem>
                                    {driveTypes.map((d) => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>Engine CC (min)</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={engineMin}
                                    onChange={(e) => setEngineMin(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Engine CC (max)</Label>
                                <Input
                                    type="number"
                                    placeholder="5000"
                                    value={engineMax}
                                    onChange={(e) => setEngineMax(e.target.value)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}