// server/FeaturedInventory.tsx
import { getFeaturedVehicles } from '@/server/queries/vehicles';
import FeaturedInventoryClient from '@/sections/FeaturedInventoryClient'; // We'll rename the client component

export default async function FeaturedInventory() {
    const vehicles = await getFeaturedVehicles(6);

    // If no vehicles, you could show a placeholder or hide the section
    if (!vehicles.length) {
        return null;
    }

    return <FeaturedInventoryClient vehicles={vehicles} />;
}