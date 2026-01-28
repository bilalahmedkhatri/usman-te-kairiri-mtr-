"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const COUNTRIES = [
  "Trinidad and Tobago",
  "United Kingdom",
  "East-Timor",
  "Tonga",
  "Australia",
  "Pakistan",
  "Samoa",
  "Solomon",
  "Jamaica",
  "Kiribati",
  "Fiji",
  "PNG",
  "Guyana",
  "Suriname",
  "Micronesia",
];

export function ReviewsCarousel() {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewApi.getAll(undefined, true),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const countriesWithReviews = COUNTRIES.filter((country) =>
    reviews.some((r) => r.country.toLowerCase().includes(country.toLowerCase()))
  );

  const displayCountries = countriesWithReviews.length > 0 
    ? countriesWithReviews 
    : COUNTRIES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayCountries.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [displayCountries.length]);

  const currentCountry = displayCountries[currentIndex];
  const countryReviews = reviews.filter((r) =>
    r.country.toLowerCase().includes(currentCountry.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {/* Country Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            {displayCountries.map((country, index) => (
              <span
                key={country}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  index === currentIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {country}
              </span>
            ))}
          </div>

          {/* Review Content */}
          {countryReviews.length > 0 ? (
            <div className="space-y-2">
              {countryReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="border-l-4 border-primary pl-4">
                  {review.rating && (
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < (review.rating || 0) ? "text-yellow-500" : "text-gray-300"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  {review.content && (
                    <p className="text-muted-foreground italic">"{review.content}"</p>
                  )}
                  {review.customer_name && (
                    <p className="text-sm font-medium mt-1">— {review.customer_name}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              We serve customers in {currentCountry} and many other countries worldwide.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
