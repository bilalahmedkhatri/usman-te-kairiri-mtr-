"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Michael Thompson",
    country: "United Kingdom",
    rating: 5,
    date: "2024-01-15",
    vehicle: "2019 Toyota Land Cruiser",
    comment: "The team at Cars International made the import process incredibly smooth. The condition of the Land Cruiser exceeded my expectations. Highly recommended!",
    avatar: "MT"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    country: "New Zealand",
    rating: 5,
    date: "2024-01-10",
    vehicle: "2020 Mazda CX-5",
    comment: "Shipping was faster than expected. Communication was excellent throughout the entire process. Will definitely buy my next car here.",
    avatar: "SJ"
  },
  {
    id: 3,
    name: "David Chen",
    country: "Singapore",
    rating: 4,
    date: "2023-12-28",
    vehicle: "2018 Honda Odyssey",
    comment: "Good service and transparent pricing. The car arrived in great condition. Just a small delay in shipping documents but was sorted out quickly.",
    avatar: "DC"
  },
  {
    id: 4,
    name: "James Wilson",
    country: "Kenya",
    rating: 5,
    date: "2023-12-15",
    vehicle: "2017 Mitsubishi Pajero",
    comment: "Best exporter I have dealt with. Honest inspection reports and very professional staff.",
    avatar: "JW"
  }
];

export default function CustomerReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Customer Stories</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See why thousands of customers worldwide trust us with their vehicle purchases.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{review.country}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary" className="font-normal text-xs">
                  Verified Purchase: {review.vehicle}
                </Badge>
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                &quot;{review.comment}&quot;
              </p>
              <p className="text-xs text-muted-foreground mt-4 text-right">
                {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
