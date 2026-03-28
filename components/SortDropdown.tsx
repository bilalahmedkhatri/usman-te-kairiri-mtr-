// components/SortDropdown.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortDropdownProps {
    currentSort: string;
    currentOrder: string;
}

export function SortDropdown({ currentSort, currentOrder }: SortDropdownProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const [sortBy, sortOrder] = value.split('-');
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', sortBy);
        params.set('order', sortOrder);
        router.push(`${pathname}?${params.toString()}`);
    };

    const currentValue = `${currentSort}-${currentOrder}`;

    return (
        <Select value={currentValue} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="createdAt-desc">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="year-desc">Year: Newest First</SelectItem>
                <SelectItem value="year-asc">Year: Oldest First</SelectItem>
                <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                <SelectItem value="mileage-desc">Mileage: High to Low</SelectItem>
                <SelectItem value="make-asc">Make: A to Z</SelectItem>
            </SelectContent>
        </Select>
    );
}