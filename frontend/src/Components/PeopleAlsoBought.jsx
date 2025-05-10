import { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import axios from "../lib/axios.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

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
      <div className="mt-10 bg-card/40 dark:bg-dark-card/40 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-semibold text-primary mb-8 inline-block border-b-2 border-primary/30 pb-2">
          People Also Bought
        </h3>
        <div className="py-12 flex flex-col items-center">
          <LoadingSpinner />
          <p className="mt-4 text-foreground/70 dark:text-dark-foreground/70 font-medium">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  // Return null if no recommendations after loading
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 bg-card/40 dark:bg-dark-card/40 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-primary mb-8 inline-block border-b-2 border-primary/30 pb-2">
        People Also Bought
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default PeopleAlsoBought;
