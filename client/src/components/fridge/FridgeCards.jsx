// import React from "react";
// import { Link } from "react-router";
// import { BsInfoSquare } from "react-icons/bs";

// const FridgeCards = ({ currentItems }) => {
//   if (currentItems.length === 0) {
//     return (
//       <div className="text-center text-gray-500 py-20">
//         <p className="text-lg font-medium">No food items found</p>
//         <p className="text-sm">Try changing your filters or search query.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {currentItems.map((item) => {
//         return (
//           <div key={item._id} className="relative">
//             {item.status === "expired" && (
//               <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 shadow z-10">
//                 Expired
//               </div>
//             )}

//             {item.status === "nearly expired" && (
//               <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 shadow z-10">
//                 Nearly Expired
//               </div>
//             )}

//             <div className="bg-white overflow-hidden shadow hover:shadow-lg transition duration-300">
//               <img
//                 src={item.foodImage}
//                 alt={item.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4 space-y-2 pb-10">
//                 <h2 className="text-xl font-semibold">{item.title}</h2>
//                 <p className="text-sm text-gray-600">
//                   Category: {item.category}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Quantity: {item.quantity}
//                 </p>
//               </div>

//               <Link
//                 to={`/details/${item._id}`}
//                 className="absolute bottom-3 right-3 text-gray-600 hover:text-blue-800 text-xl"
//                 title="View Details"
//               >
//                 <BsInfoSquare />
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default FridgeCards;

import React from "react";
import { Link } from "react-router";
import { BsInfoSquare } from "react-icons/bs";
import { useTheme } from "../../hooks/ThemeContext"; // adjust path as needed

const FridgeCards = ({ currentItems }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (currentItems.length === 0) {
    return (
      <div className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <p className="text-lg font-medium">No food items found</p>
        <p className="text-sm">Try changing your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentItems.map((item) => {
        const bgClass = isDark ? "bg-gray-800" : "bg-white";
        const textClass = isDark ? "text-gray-300" : "text-gray-600";
        const hoverShadow = isDark ? "hover:shadow-green-700" : "hover:shadow-lg";

        return (
          <div key={item._id} className="relative">
            {item.status === "expired" && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 shadow z-10">
                Expired
              </div>
            )}

            {item.status === "nearly expired" && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 shadow z-10">
                Nearly Expired
              </div>
            )}

            <div
              className={`${bgClass} overflow-hidden shadow transition duration-300 ${hoverShadow}`}
            >
              <img
                src={item.foodImage}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className={`p-4 space-y-2 pb-10`}>
                <h2 className={`text-xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                  {item.title}
                </h2>
                <p className={`text-sm ${textClass}`}>
                  Category: {item.category}
                </p>
                <p className={`text-sm ${textClass}`}>
                  Quantity: {item.quantity}
                </p>
              </div>

              <Link
                to={`/details/${item._id}`}
                className={`absolute bottom-3 right-3 ${isDark ? "text-gray-400 hover:text-green-400" : "text-gray-600 hover:text-blue-800"} text-xl`}
                title="View Details"
              >
                <BsInfoSquare />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FridgeCards;

