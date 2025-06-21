import React from "react";
import { useTheme } from "../../hooks/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Theme-based classes
  const footerBg = isDark ? "bg-gray-900" : "bg-[#F4FDF5]";
  const textColor = isDark ? "text-gray-300" : "text-gray-700";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-600";
  const copyrightColor = isDark ? "text-gray-500" : "text-gray-500";

  return (
    <footer
      className={`${footerBg} ${textColor} py-8 px-4 sm:px-8 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            🥦 EatSafe Vault
          </h2>
          <p className={`text-sm mt-1 ${subTextColor}`}>
            Smart fridge tracking to reduce food waste and keep your kitchen
            organized.
          </p>
        </div>

        {/* Copyright */}
        <div className={`text-sm ${copyrightColor}`}>
          &copy; {new Date().getFullYear()} EatSafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
