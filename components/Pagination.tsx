// components/Pagination.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    queryParams: Record<string, string | string[] | undefined>;
}

export function Pagination({ currentPage, totalPages, basePath, queryParams }: PaginationProps) {
    const getPageUrl = (page: number) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            if (key !== 'page' && value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.set(key, value as string);
                }
            }
        });
        params.set('page', page.toString());
        return `${basePath}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
                <Link href={getPageUrl(currentPage - 1)}>
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                </Link>
            )}
            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link href={getPageUrl(currentPage + 1)}>
                    <Button variant="outline" size="sm">
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            )}
        </div>
    );
}