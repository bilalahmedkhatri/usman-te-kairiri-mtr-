import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"; // Premium fonts
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontHeading = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    title: "TE KAIRIRI MOTORS - Premium Vehicle Export from Japan",
    description: "Professional vehicle export services from Japan. Browse our extensive inventory of cars, trucks, and specialized vehicles. Worldwide shipping available.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary",
                fontSans.variable,
                fontHeading.variable
            )}>
                <Providers>
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 2000,
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    );
}