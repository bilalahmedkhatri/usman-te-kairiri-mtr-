"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
                variant={value === "grid" ? "secondary" : "ghost"}
                size="sm"
                className={cn("px-3", value === "grid" && "bg-secondary")}
                onClick={() => onChange("grid")}
                aria-label="Grid view"
            >
                <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
                variant={value === "list" ? "secondary" : "ghost"}
                size="sm"
                className={cn("px-3", value === "list" && "bg-secondary")}
                onClick={() => onChange("list")}
                aria-label="List view"
            >
                <List className="w-4 h-4" />
            </Button>
        </div>
    );
}
