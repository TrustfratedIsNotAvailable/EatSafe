import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../hooks/ThemeContext"; // adjust path if needed

const CallToAction = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full mt-16 py-10 px-6 rounded-t-xl text-center shadow-md border transition-colors duration-300
        ${
          isDark
            ? "bg-gray-800 border-green-700"
            : "bg-[#E8F5E9] border-green-200"
        }
      `}
    >
      <h2
        className={`text-2xl md:text-3xl font-bold mb-4 ${
          isDark ? "text-green-400" : "text-[#1B5E20]"
        }`}
      >
        Ready to reduce food waste?
      </h2>
      <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Start tracking your food, avoid spoilage, and make every item count.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className={`font-semibold py-2 px-6 rounded-full transition duration-200 ${
            isDark
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-[#1B5E20] hover:bg-green-700 text-white"
          }`}
        >
          Get Started
        </Link>
        <Link
          to="/dashboard"
          className={`font-semibold py-2 px-6 rounded-full transition duration-200 border ${
            isDark
              ? "border-green-600 text-green-400 hover:bg-green-700 hover:text-white"
              : "border-[#1B5E20] text-[#1B5E20] hover:bg-[#C8E6C9]"
          }`}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
