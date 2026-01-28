// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { NewArrivals } from "@/components/vehicle-card";
// import { ReviewsCarousel } from "@/components/reviews-carousel";
// import { EnhancedVehicleFilters } from "@/components/enhanced-vehicle-filters";
// import { useQuery } from "@tanstack/react-query";
// import { vehicleApi, VehicleFilters, reviewApi } from "@/lib/api";
// import { VehicleCard } from "@/components/vehicle-card";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function Home() {
//   const [filters, setFilters] = useState<VehicleFilters>({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [isSearching, setIsSearching] = useState(false);

//   const { data: stocks = [], isLoading } = useQuery({
//     queryKey: ["vehicles", "stocks"],
//     queryFn: () =>
//       vehicleApi.getAll({
//         status: "available",
//         sort: "created_at_desc",
//         limit: 8,
//       }),
//   });

//   const { data: newArrivals = [], isLoading: isLoadingNewArrivals } = useQuery({
//     queryKey: ["vehicles", "new-arrivals"],
//     queryFn: () =>
//       vehicleApi.getAll({
//         status: "available",
//         sort: "created_at_desc",
//         limit: 8,
//       }),
//   });

//   const { data: countryReviews = [] } = useQuery({
//     queryKey: ["reviews", selectedCountry],
//     queryFn: () => reviewApi.getAll(selectedCountry || undefined, true),
//   });

//   const handleSearch = async () => {
//     if (searchQuery.trim()) {
//       setIsSearching(true);
//       try {
//         const results = await vehicleApi.getAll({
//           search: searchQuery.trim(),
//           status: "available",
//           limit: 12,
//         });
//         setSearchResults(results);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setSearchResults([]);
//       } finally {
//         setIsSearching(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <div className="text-center space-y-4 mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold">
//           Premium Vehicle Export from Japan
//         </h1>
//         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//           Discover and export premium vehicles from our extensive inventory.
//           Professional service, competitive prices, worldwide shipping.
//         </p>
//       </div>

//       {/* Three Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* First Column: Filters */}
//         <div className="lg:col-span-3">
//           <div className="sticky top-4">
//             <EnhancedVehicleFilters
//               filters={filters}
//               onFiltersChange={setFilters}
//             />
//           </div>
//         </div>

//         {/* Second Column: Main Search & Content */}
//         <div className="lg:col-span-9 space-y-8">
//           {/* Main Search Section */}
//           <Card className="border-0 shadow-none bg-transparent">
//             <CardContent className="p-0">
//               <div className="relative max-w-2xl mx-auto">
//                 <Input
//                   placeholder="Search by make, model, stock number..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   className="pr-12 rounded-full focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 />
//                 <div className="absolute right-0 top-0 h-full flex">
//                   {searchQuery && (
//                     <Button
//                       onClick={clearSearch}
//                       className="rounded-none rounded-l-full h-full px-3 m-0 border-0 bg-gray-200 hover:bg-gray-300 text-gray-600"
//                       size="sm"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </Button>
//                   )}
//                   <Button
//                     onClick={handleSearch}
//                     disabled={isSearching}
//                     className="rounded-none rounded-r-full h-full px-4 m-0 border-0 bg-primary hover:bg-primary/90"
//                     size="sm"
//                   >
//                     {isSearching ? (
//                       <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Search Results */}
//           {searchResults.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm"
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
//                   <p className="text-gray-600">
//                     {searchResults.length} vehicle{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"
//                   </p>
//                 </div>
//                 <Button
//                   variant="outline"
//                   onClick={clearSearch}
//                   className="bg-white hover:bg-gray-50 border-gray-200"
//                 >
//                   Clear Search
//                 </Button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {searchResults.map((vehicle, index) => (
//                   <motion.div
//                     key={vehicle.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                   >
//                     <VehicleCard vehicle={vehicle} />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Default Content (shown when no search results) */}
//           {searchResults.length === 0 && (
//             <>
//               {/* New Arrivals */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.1 }}
//                 className="from-purple-50 p-4 shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
//                   </div>
//                   <Link href="/inventory">
//                     <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
//                       View All
//                     </Button>
//                   </Link>
//                 </div>
//                 <NewArrivals vehicles={newArrivals} isLoading={isLoadingNewArrivals} />
//               </motion.div>

//               {/* Available Stocks */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Stocks</h2>
//                     <p className="text-gray-600">Browse our complete inventory</p>
//                   </div>
//                   <Link href="/inventory">
//                     <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
//                       View All
//                     </Button>
//                   </Link>
//                 </div>

//                 {isLoading ? (
//                   <div className="animate-pulse">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {[...Array(6)].map((_, i) => (
//                         <div key={i} className="bg-white rounded-lg h-64"></div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : stocks.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {stocks.slice(0, 6).map((vehicle, index) => (
//                       <motion.div
//                         key={vehicle.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: index * 0.1 }}
//                       >
//                         <VehicleCard vehicle={vehicle} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <p className="text-gray-500 text-lg">No vehicles available at the moment.</p>
//                   </div>
//                 )}
//               </motion.div>
//             </>
//           )}


//           {/* Customer Reviews */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold">What Our Customers Say</h2>
//             <ReviewsCarousel />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// 'use client';

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { NewArrivals } from "@/components/vehicle-card";
// import { ReviewsCarousel } from "@/components/reviews-carousel";
// import { EnhancedVehicleFilters } from "@/components/enhanced-vehicle-filters";
// import { useQuery } from "@tanstack/react-query";
// import { vehicleApi, VehicleFilters, reviewApi } from "@/lib/api";
// import { VehicleCard } from "@/components/vehicle-card";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { LoginModal } from "@/components/login-modal";
// import { RegisterModal } from "@/components/register-modal";

// export default function Home() {
//   const [filters, setFilters] = useState<VehicleFilters>({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   const { data: stocks = [], isLoading } = useQuery({
//     queryKey: ["vehicles", "stocks"],
//     queryFn: () =>
//       vehicleApi.getAll({
//         status: "available",
//         sort: "created_at_desc",
//         limit: 8,
//       }),
//   });

//   const { data: newArrivals = [], isLoading: isLoadingNewArrivals } = useQuery({
//     queryKey: ["vehicles", "new-arrivals"],
//     queryFn: () =>
//       vehicleApi.getAll({
//         status: "available",
//         sort: "created_at_desc",
//         limit: 8,
//       }),
//   });

//   const { data: countryReviews = [] } = useQuery({
//     queryKey: ["reviews", selectedCountry],
//     queryFn: () => reviewApi.getAll(selectedCountry || undefined, true),
//   });

//   const handleSearch = async () => {
//     if (searchQuery.trim()) {
//       setIsSearching(true);
//       try {
//         const results = await vehicleApi.getAll({
//           search: searchQuery.trim(),
//           status: "available",
//           limit: 12,
//         });
//         setSearchResults(results);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setSearchResults([]);
//       } finally {
//         setIsSearching(false);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Modals */}
//       <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
//       <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />

//       {/* Hero Section with Auth Buttons */}
//       <motion.div 
//         className="text-center space-y-6 mb-12"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Premium Vehicle Export from Japan
//         </h1>
//         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//           Discover and export premium vehicles from our extensive inventory.
//           Professional service, competitive prices, worldwide shipping.
//         </p>

//         {/* Auth Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
//           <Button 
//             size="lg" 
//             className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg"
//             onClick={() => setShowLogin(true)}
//           >
//             Sign In
//           </Button>
//           <Button 
//             size="lg" 
//             variant="outline"
//             className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold"
//             onClick={() => setShowRegister(true)}
//           >
//             Create Account
//           </Button>
//         </div>
//       </motion.div>

//       {/* Rest of your existing content... */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Filters */}
//         <div className="lg:col-span-3">
//           <div className="sticky top-4">
//             <EnhancedVehicleFilters
//               filters={filters}
//               onFiltersChange={setFilters}
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-9 space-y-8">
//           {/* Search Bar */}
//           <Card className="border-0 shadow-none bg-transparent">
//             <CardContent className="p-0">
//               <div className="relative max-w-2xl mx-auto">
//                 <Input
//                   placeholder="Search by make, model, stock number..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   className="pr-12 rounded-full"
//                 />
//                 <div className="absolute right-0 top-0 h-full flex">
//                   {searchQuery && (
//                     <Button
//                       onClick={clearSearch}
//                       className="rounded-none rounded-l-full h-full px-3 m-0 bg-gray-200 hover:bg-gray-300 text-gray-600"
//                       size="sm"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </Button>
//                   )}
//                   <Button
//                     onClick={handleSearch}
//                     disabled={isSearching}
//                     className="rounded-none rounded-r-full h-full px-4 m-0 bg-primary hover:bg-primary/90"
//                     size="sm"
//                   >
//                     {isSearching ? (
//                       <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* ... rest of your existing code ... */}
//           {searchResults.length > 0 && (
//             <motion.div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
//               <div className="flex justify-between items-center mb-8">
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
//                   <p className="text-gray-600">
//                     {searchResults.length} vehicle{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"
//                   </p>
//                 </div>
//                 <Button variant="outline" onClick={clearSearch}>
//                   Clear Search
//                 </Button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {searchResults.map((vehicle, index) => (
//                   <motion.div key={vehicle.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*0.1}}>
//                     <VehicleCard vehicle={vehicle} />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {searchResults.length === 0 && (
//             <motion.div>
//               <NewArrivals vehicles={newArrivals} isLoading={isLoadingNewArrivals} />
//               {/* Available Stocks */}
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-sm mt-8">
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Stocks</h2>
//                     <p className="text-gray-600">Browse our complete inventory</p>
//                   </div>
//                   <Link href="/inventory">
//                     <Button variant="outline">View All</Button>
//                   </Link>
//                 </div>
//                 {isLoading ? (
//                   <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {[...Array(6)].map((_, i) => (
//                       <div key={i} className="bg-white rounded-lg h-64"></div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {stocks.slice(0, 6).map((vehicle, index) => (
//                       <motion.div key={vehicle.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*0.1}}>
//                         <VehicleCard vehicle={vehicle} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               {/* Reviews */}
//               <div className="mt-8">
//                 <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//                 <ReviewsCarousel />
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeaturedMakes from '@/sections/FeaturedMakes';
// import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const products = [
    {
      name: 'Premium Headphones',
      price: 299,
      description: 'Noise-cancelling wireless headphones with premium sound',
      features: ['40hr battery', 'Active noise cancellation', 'Premium build'],
    },
    {
      name: 'Smart Watch Pro',
      price: 399,
      description: 'Advanced fitness tracking and smart notifications',
      features: ['Heart rate monitor', 'GPS tracking', 'Water resistant'],
    },
    {
      name: 'Ultra Laptop',
      price: 1499,
      description: 'Powerful performance for professionals and creators',
      features: ['32GB RAM', '1TB SSD', '4K Retina display'],
    },
    {
      name: 'Wireless Earbuds',
      price: 159,
      description: 'Compact true wireless audio experience',
      features: ['Touch controls', 'Fast charging', 'Spatial audio'],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-500">

        <FeaturedMakes />
        {/* Featured Cards */}
        <section id="featured" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Featured Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.slice(0, 3).map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${product.name.replace(/\s+/g, '')}/600/400`}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Cards */}
        <section id="compact" className="py-20 px-6 bg-gray-100 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Compact Cards</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="rounded-2xl shadow-lg text-center">
                    <CardContent className="p-6">
                      <img
                        src={`https://picsum.photos/seed/${product.name.replace(/\s+/g, '')}/200/200`}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-xl mb-4"
                      />
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-2xl font-bold mt-3">${product.price}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Cards */}
        <section id="horizontal" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Horizontal Cards</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {products.slice(0, 2).map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 16 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={`https://picsum.photos/seed/${product.name.replace(/\s+/g, '')}/600/500`}
                      alt={product.name}
                      className="w-full md:w-96 h-80 md:h-auto object-cover"
                    />
                    <div className="flex-1 p-8">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-3xl">{product.name}</CardTitle>
                        <CardDescription className="text-lg">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-4xl font-bold">${product.price}</p>
                        <ul className="mt-6 space-y-3">
                          {product.features.map((f) => (
                            <li key={f} className="flex items-center gap-3">
                              <span className="text-green-500 text-xl">✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button size="lg">Add to Cart</Button>
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing" className="py-20 px-6 bg-gray-100 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Pricing Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.slice(0, 3).map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`relative ${i === 1 ? 'md:-translate-y-6' : ''}`}
                >
                  <Card className={`rounded-2xl shadow-2xl h-full ${i === 1 ? 'ring-2 ring-blue-500' : ''}`}>
                    {i === 1 && (
                      <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 text-base">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <p className="text-5xl font-bold mt-6">
                        ${product.price}<span className="text-xl font-normal text-gray-500">/mo</span>
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 mt-8">
                        {product.features.map((f) => (
                          <li key={f} className="flex items-center gap-4">
                            <span className="text-green-500 text-xl">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button className="w-full" size="lg" variant={i === 1 ? 'default' : 'outline'}>
                        Choose Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hover Animated Cards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Hover Animated Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.slice(0, 3).map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Card className="h-full border-0">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.7 }}
                      className="overflow-hidden"
                    >
                      <img
                        src={`https://picsum.photos/seed/${product.name.replace(/\s+/g, '')}/600/400`}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="w-full"
                      >
                        <Button className="w-full">Add to Cart</Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Overlay Cards */}
        <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Image Overlay Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.slice(0, 3).map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06 }}
                  className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={`https://picsum.photos/seed/${product.name.replace(/\s+/g, '')}/800/1000`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold">{product.name}</h3>
                    <p className="text-xl mt-3 opacity-90">{product.description}</p>
                    <p className="text-4xl font-bold mt-6">${product.price}</p>
                    <Button variant="secondary" className="mt-6">
                      Shop Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Glassmorphism Cards */}
        <section
          className="py-20 px-6 relative overflow-hidden"
          style={{
            backgroundImage: 'ur[](https://picsum.photos/seed/glassbg/1920/1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Glassmorphism Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.slice(0, 3).map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -12 }}
                  className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl shadow-2xl p-10 text-white"
                >
                  <h3 className="text-3xl font-bold">{product.name}</h3>
                  <p className="text-xl mt-4 opacity-90">{product.description}</p>
                  <p className="text-5xl font-bold mt-10">${product.price}</p>
                  <Button variant="outline" className="mt-8 w-full border-white/50 text-white hover:bg-white/20">
                    Add to Cart
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Product Card Showcase • Built with Tailwind, shadcn/ui & Framer Motion
          </p>
        </footer>
      </d iv>
    </>
  );
}