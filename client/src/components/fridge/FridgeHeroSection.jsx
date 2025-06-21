// import React, { useState } from "react";
// import { Search } from "lucide-react";

// const FridgeHeroSection = ({ setSearchQuery }) => {
//   const [tempQuery, setTempQuery] = useState("");

//   const handleSearch = () => {
//     setSearchQuery(tempQuery.trim());
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <section className="w-full py-14 px-4 lg:px-16">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-3xl lg:text-4xl font-bold text-green-600 mb-4">
//           Fridge
//         </h1>
//         <p className="text-gray-700 mb-8 text-lg">
//           Easily search and manage your stored food items.
//         </p>

//         <div className="flex justify-center">
//           <div className="flex items-center w-full max-w-xl bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
//             <input
//               type="text"
//               placeholder="Search food by title..."
//               value={tempQuery}
//               onChange={(e) => setTempQuery(e.target.value)}
//               onKeyDown={handleKeyPress}
//               className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 transition-colors duration-200"
//             >
//               <Search className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FridgeHeroSection;
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext"; // adjust import path

const FridgeHeroSection = ({ setSearchQuery }) => {
  const [tempQuery, setTempQuery] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSearch = () => {
    setSearchQuery(tempQuery.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={`w-full py-14 px-4 lg:px-16 transition-colors duration-300
      ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${
          isDark ? "text-green-400" : "text-green-600"
        }`}>
          Fridge
        </h1>
        <p className={`mb-8 text-lg transition-colors duration-300 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}>
          Easily search and manage your stored food items.
        </p>

        <div className="flex justify-center">
          <div
            className={`flex items-center w-full max-w-xl rounded-lg overflow-hidden shadow-md transition-colors duration-300
            ${isDark
              ? "bg-gray-800 border border-green-700"
              : "bg-white border border-gray-300"
            }`}
          >
            <input
              type="text"
              placeholder="Search food by title..."
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`flex-1 px-4 py-3 transition-colors duration-300 focus:outline-none
                ${isDark ? "bg-gray-800 text-gray-200 placeholder-gray-400" : "bg-white text-gray-700 placeholder-gray-500"}`}
            />
            <button
              onClick={handleSearch}
              className={`px-4 py-3 transition-colors duration-200
                ${isDark
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              aria-label="Search"
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
