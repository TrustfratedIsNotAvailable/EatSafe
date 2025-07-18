import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useTheme } from "../hooks/ThemeContext";
import api from "../api/api";

const FeedbackForm = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    const feedback = {
      review,
      rating,
      name: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      uid: user.uid,
      createdAt: new Date(),
    };

    try {
      const res = await api.post(
        "/reviews",
        feedback
      );
      if (res.data.insertedId) {
        toast.success("Thanks for your review!");
        setReview("");
        setRating(0);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error submitting feedback");
      console.error(error);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="max-w-xl mx-auto py-12 px-4 md:px-0">
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          isDark ? "text-green-300" : "text-[#1B5E20]"
        }`}
      >
        ✍️ Leave a Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-xl shadow-md border space-y-4 ${
          isDark
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-black/15 text-gray-900"
        }`}
      >
        <textarea
          placeholder="Write your review..."
          value={review}
          required
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          maxLength={300}
          className={`w-full rounded-lg px-4 py-2 border ${
            isDark
              ? "bg-gray-900 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-black/15 text-gray-900 placeholder-gray-500"
          }`}
        />
        <p
          className={`text-sm text-right ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {review.length}/300
        </p>

        {/* Star Rating */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Rating:
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="text-xl text-yellow-500"
              >
                {star <= rating ? <FaStar /> : <FaRegStar />}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#1B5E20] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
