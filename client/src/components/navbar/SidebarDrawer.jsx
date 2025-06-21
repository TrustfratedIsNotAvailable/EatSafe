import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";
import NavLinks from "./NavLinks";
import { useTheme } from "../../hooks/ThemeContext";

const SidebarDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleDrawer}
        className={`p-4 text-2xl focus:outline-none ${
          isDark ? "text-white" : "text-[#1B5E20]"
        }`}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleDrawer}
          role="presentation"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDark
            ? "bg-gray-900 text-white shadow-gray-700"
            : "bg-white text-black shadow-lg"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="logo" className={`h-8 ${isDark ? "bg-white rounded-lg":""}`} />
            <h1
              className={`font-bold text-xl ${
                isDark ? "text-white" : "text-[#1B5E20]"
              }`}
            >
              EatSafe
            </h1>
          </div>
          <button onClick={toggleDrawer} aria-label="Close menu">
            <X className={isDark ? "text-white" : "text-black"} />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex flex-col gap-4 p-4">
          <NavLinks />
        </nav>
      </aside>
    </>
  );
};

export default SidebarDrawer;
