import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaStar, FaRegStar } from "react-icons/fa";

const FeedbackForm = () => {
  const { user } = useAuth();
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
      const res = await axios.post(
        "https://eatsafe-server.vercel.app/reviews"
        // `${import.meta.env.VITE_API_URL}/reviews`
        , feedback);
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

  return (
    <div className="max-w-xl mx-auto py-12 px-4 md:px-0">
      <h2 className="text-3xl font-bold text-center text-[#1B5E20] mb-6">
        ✍️ Leave a Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border border-black/15 space-y-4"
      >
        <textarea
          placeholder="Write your review..."
          value={review}
          required
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          maxLength={300}
          className="w-full bg-white border border-black/15 rounded-lg px-4 py-2"
        />
        <p className="text-sm text-gray-500 text-right">{review.length}/300</p>

        {/* Star Rating */}
        <div>
          <label className="block font-medium text-gray-600 mb-1">
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
