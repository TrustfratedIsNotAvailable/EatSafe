import React, { useState } from "react";
import { Search } from "lucide-react";

const FridgeHeroSection = ({ setSearchQuery }) => {
  const [tempQuery, setTempQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(tempQuery.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="w-full py-14 px-4 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">
          Fridge
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Easily search and manage your stored food items.
        </p>

        <div className="flex justify-center">
          <div className="flex items-center w-full max-w-xl bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search food by title..."
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeHeroSection;
