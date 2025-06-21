import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch last 3 reviews
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "https://eatsafe-server.vercel.app/reviews?limit=3&sort=desc"
          // `${import.meta.env.VITE_API_URL}/reviews?limit=3&sort=desc`
        );
        setReviews(res.data.slice(-3)); // Take last 3 reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    // No reviews found
    return (
      <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1B5E20] mb-8">
          💬 What Our Users Say
        </h2>
        <p className="text-gray-600">
          No reviews found yet. Be the first to leave a review!
        </p>
      </div>
    );
  }

  const { name, review: text, rating, photoURL: image } = reviews[index];

  return (
    <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#1B5E20] mb-8">
        💬 What Our Users Say
      </h2>

      <div className="bg-white border border-gray-200 shadow rounded-xl p-6 relative">
        <img
          src={image || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={name}
          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-green-500"
        />
        <p className="italic text-gray-700 mb-4">“{text}”</p>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${
                i < rating ? "opacity-100" : "opacity-20"
              }`}
            />
          ))}
        </div>
        <p className="font-semibold text-[#1B5E20]">{name}</p>

        {/* Manual Controls */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                index === i ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
