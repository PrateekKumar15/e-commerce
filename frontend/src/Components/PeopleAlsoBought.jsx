import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import LoadingSpinner from "./LoadingSpinner";

function PeopleAlsoBought() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error); // Log error instead of toast
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  // Return LoadingSpinner directly here
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <LoadingSpinner />
        <p className="mt-2 text-foreground/70 dark:text-dark-foreground/70">Loading recommendations...</p>
      </div>
    );
  }

  // Return null if no recommendations after loading
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      {/* Title: Updated text color */}
      <h3 className="text-2xl font-semibold text-primary mb-6">
        People Also Bought
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default PeopleAlsoBought;
