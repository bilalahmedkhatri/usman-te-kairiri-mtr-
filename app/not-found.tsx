import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh] text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <h1 className="text-[10rem] font-bold font-heading text-primary/20 leading-none">404</h1>
            <h2 className="text-4xl font-bold font-heading mb-4 -mt-12 relative z-10">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mb-8 text-lg relative z-10">
                Sorry, the page you are looking for does not exist or has been moved.
                Let's get you back on the road.
            </p>

            <Link href="/">
                <Button size="lg" className="rounded-full px-8 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return Home
                </Button>
            </Link>
        </div>
    );
}
