"use client";

import { useFavorites } from "@/lib/store/favorites-store";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
    vehicleId: number;
    className?: string;
}

export function FavoriteButton({ vehicleId, className }: FavoriteButtonProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(vehicleId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a Link
        e.stopPropagation();

        toggleFavorite(vehicleId);

        if (!favorite) {
            toast.success("Added to favorites");
        } else {
            toast("Removed from favorites");
        }
    };

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={cn(
                "p-2 rounded-full transition-colors",
                favorite
                    ? "bg-red-100 dark:bg-red-900/50 text-red-600"
                    : "bg-white/80 dark:bg-slate-800/80 text-gray-600 hover:text-red-600",
                className
            )}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart
                className={cn("w-5 h-5 transition-all", favorite && "fill-current")}
            />
        </motion.button>
    );
}
