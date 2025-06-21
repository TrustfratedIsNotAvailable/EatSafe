import React from "react";
import { Link } from "react-router";
import { useTheme } from "../hooks/ThemeContext";
import { BiError } from "react-icons/bi";

const ErrorPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 text-center ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <BiError size={80} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
