"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const reviews = [
  {
    id: 1,
    name: "Michael Thompson",
    country: "United Kingdom",
    rating: 5,
    date: "2024-01-15",
    vehicle: "2019 Toyota Land Cruiser V8",
    comment: "The team at TE KAIRIRI MOTORS made the import process incredibly smooth. The condition of the Land Cruiser exceeded my expectations. From initial inquiry to delivery, everything was professional and transparent. Highly recommended to anyone looking to import from Japan!",
    avatar: "MT",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    country: "New Zealand",
    rating: 5,
    date: "2024-01-10",
    vehicle: "2020 Mazda CX-5",
    comment: "Shipping was faster than expected. Communication was excellent throughout the entire process. The vehicle arrived exactly as described in the inspection report. Will definitely buy my next car here and recommend to friends and family.",
    avatar: "SJ",
    verified: true
  },
  {
    id: 3,
    name: "David Chen",
    country: "Singapore",
    rating: 4,
    date: "2023-12-28",
    vehicle: "2018 Honda Odyssey",
    comment: "Good service and transparent pricing. The car arrived in great condition. Just a small delay in shipping documents but was sorted out quickly by their responsive support team. Overall a positive experience.",
    avatar: "DC",
    verified: true
  },
  {
    id: 4,
    name: "James Wilson",
    country: "Kenya",
    rating: 5,
    date: "2023-12-15",
    vehicle: "2017 Mitsubishi Pajero",
    comment: "Best exporter I have dealt with in 10 years of importing cars. Honest inspection reports, very professional staff, and competitive pricing. The vehicle was exactly as described and arrived in perfect condition.",
    avatar: "JW",
    verified: true
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    country: "USA",
    rating: 5,
    date: "2024-01-05",
    vehicle: "2021 Subaru WRX STI",
    comment: "Absolutely thrilled with my purchase! The team was incredibly helpful throughout the entire process. They even helped me find the exact specifications I was looking for. Shipping to the US was seamless and well-coordinated.",
    avatar: "ER",
    verified: true
  },
  {
    id: 6,
    name: "Thomas Andersson",
    country: "Sweden",
    rating: 5,
    date: "2023-12-20",
    vehicle: "2016 Nissan GT-R",
    comment: "When buying a performance car like a GT-R, you want absolute certainty about the condition. TE KAIRIRI MOTORS provided a comprehensive inspection report and even arranged for a third-party inspection. The car is perfect!",
    avatar: "TA",
    verified: true
  }
];

export default function CustomerReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fourStarCount = reviews.filter(r => r.rating === 4).length;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-br from-red-50 via-orange-50 to-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Badge className="bg-red-100 text-red-600 border-0 px-4 py-2 text-sm font-semibold">
              Trusted by Thousands
            </Badge>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Customer Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See why thousands of customers worldwide trust us with their vehicle purchases. Real stories from real customers.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-5xl font-bold text-gray-900 mb-2">98%</div>
            <p className="text-sm text-gray-600">Would Recommend Us</p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-green-500 rounded-full" />
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-5xl font-bold text-gray-900 mb-2">2,500+</div>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
      </motion.div>

      {/* Rating Breakdown */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 mb-16"
      >
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Rating Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-16">5 Star</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(fiveStarCount / reviews.length) * 100}%` }} />
              </div>
              <span className="text-sm text-gray-600 w-12">{fiveStarCount}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-16">4 Star</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(fourStarCount / reviews.length) * 100}%` }} />
              </div>
              <span className="text-sm text-gray-600 w-12">{fourStarCount}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="container mx-auto px-4 pb-16"
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {currentReviews.map((review) => (
            <motion.div key={review.id} variants={fadeIn}>
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">{review.name}</CardTitle>
                          <p className="text-sm text-gray-500">{review.country}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0 font-normal text-xs">
                      Verified Purchase: {review.vehicle}
                    </Badge>
                  </div>
                  <div className="relative">
                    <Quote className="w-6 h-6 text-red-200 absolute -top-2 -left-1 opacity-50" />
                    <p className="text-gray-600 leading-relaxed pl-6 italic">
                      {review.comment}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-right">
                    {new Date(review.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === i + 1
                      ? "bg-red-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Leave a Review CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-r from-red-600 to-orange-500 py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Share Your Experience
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Have you purchased a vehicle from us? We'd love to hear about your experience!
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Write a Review
          </Button>
        </div>
      </motion.div>
    </div>
  );
}