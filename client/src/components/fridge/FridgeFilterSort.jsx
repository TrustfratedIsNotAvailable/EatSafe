// import React from "react";

// const FridgeFilterSort = ({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   sortOption,
//   setSortOption,
//   totalItems,
//   startIndex,
//   endIndex,
// }) => {
//   return (
//     <div className="flex flex-col items-center justify-between md:flex-row gap-4 mb-6">
//       <p className="text-gray-700 font-medium">
//         Showing {startIndex + 1}-{endIndex} of {totalItems} results
//       </p>

//       <div className="flex gap-4">
//         <select
//           className="select select-bordered cursor-pointer border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           value={selectedCategory}
//           onChange={(e) => {
//             setSelectedCategory(e.target.value);
//           }}
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <select
//           className="select select-bordered cursor-pointer border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//         >
//           <option value="default">Sort: Default</option>
//           <option value="expiry-asc">Expiry: Soonest First</option>
//           <option value="expiry-desc">Expiry: Latest First</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FridgeFilterSort;

import React from "react";
import { useTheme } from "../../hooks/ThemeContext"; // adjust import path

const FridgeFilterSort = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  totalItems,
  startIndex,
  endIndex,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "text-gray-300" : "text-gray-700";
  const borderColor = isDark ? "border-gray-600" : "border-gray-300";
  const focusRing = isDark ? "focus:ring-green-600" : "focus:ring-[#1B5E20]";
  const bgColor = isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700";

  return (
    <div className={`flex flex-col items-center justify-between md:flex-row gap-4 mb-6`}>
      <p className={`${textColor} font-medium`}>
        Showing {startIndex + 1}-{endIndex} of {totalItems} results
      </p>

      <div className="flex gap-4">
        <select
          className={`select select-bordered cursor-pointer rounded focus:outline-none focus:ring-2
            ${borderColor} ${focusRing} ${bgColor}`}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className={`select select-bordered cursor-pointer rounded focus:outline-none focus:ring-2
            ${borderColor} ${focusRing} ${bgColor}`}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort: Default</option>
          <option value="expiry-asc">Expiry: Soonest First</option>
          <option value="expiry-desc">Expiry: Latest First</option>
        </select>
      </div>
    </div>
  );
};

export default FridgeFilterSort;

