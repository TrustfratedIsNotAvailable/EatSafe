import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";
import api from "../../api/api";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Fetch last 3 reviews
    const fetchReviews = async () => {
      try {
        const res = await api.get(
          "/reviews?limit=3&sort=desc"

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
      <div
        className={`py-12 px-4 md:px-8 max-w-3xl mx-auto text-center ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-8 ${
            isDark ? "text-green-400" : "text-[#1B5E20]"
          }`}
        >
          💬 What Our Users Say
        </h2>
        <p>No reviews found yet. Be the first to leave a review!</p>
      </div>
    );
  }

  const { name, review: text, rating, photoURL: image } = reviews[index];

  return (
    <div
      id="testimonials"
      className={`py-12 px-4 md:px-8 max-w-3xl mx-auto text-center`}
    >
      <h2
        className={`text-3xl font-bold mb-8 ${
          isDark ? "text-green-400" : "text-[#1B5E20]"
        }`}
      >
        💬 What Our Users Say
      </h2>

      <div
        className={`rounded-xl p-6 relative border shadow ${
          isDark
            ? "bg-gray-800 border-gray-700 shadow-black"
            : "bg-white border-gray-200 shadow-gray-300"
        }`}
      >
        <img
          src={image || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={name}
          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-green-500"
        />
        <p
          className={`italic mb-4 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          “{text}”
        </p>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < rating ? "text-yellow-400" : "text-yellow-700 opacity-20"
              }`}
            />
          ))}
        </div>
        <p
          className={`font-semibold ${
            isDark ? "text-green-400" : "text-[#1B5E20]"
          }`}
        >
          {name}
        </p>

        {/* Manual Controls */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                index === i
                  ? isDark
                    ? "bg-green-400"
                    : "bg-green-600"
                  : isDark
                  ? "bg-gray-600"
                  : "bg-gray-300"
              }`}
              aria-label={`Show review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
