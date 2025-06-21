import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../hooks/ThemeContext"; // adjust import path if needed
import { TbMessageCircleFilled } from "react-icons/tb";

const LeaveReview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`text-center py-12`}>
      <h3
        className={`text-2xl font-bold mb-4 ${
          isDark ? "text-green-400" : "text-[#1B5E20]"
        }`}
      >
        💬 Have Feedback?
      </h3>
      <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        We'd love to hear how the app is helping you! Share your thoughts with
        us.
      </p>
      <Link
        to={"/feedback"}
        className={`inline-block px-6 py-3 rounded-full transition ${
          isDark
            ? "bg-green-600 hover:bg-green-500 text-white"
            : "bg-[#1B5E20] hover:bg-green-700 text-white"
        }`}
      >
        ✍️ Leave a Review
      </Link>
    </div>
  );
};

export default LeaveReview;
