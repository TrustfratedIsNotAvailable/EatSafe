import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F4FDF5] text-gray-700 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-[#2E7D32]">
            🥦 EatSafe Vault
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Smart fridge tracking to reduce food waste and keep your kitchen
            organized.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EatSafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
