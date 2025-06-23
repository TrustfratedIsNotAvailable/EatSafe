import React from "react";
import { Link } from "react-router";
import { BsInfoSquare } from "react-icons/bs";
import { useTheme } from "../../hooks/ThemeContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const FridgeCards = ({ currentItems }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (currentItems.length === 0) {
    return (
      <div
        className={`text-center py-20 ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <p className="text-lg font-medium">No food items found</p>
        <p className="text-sm">Try changing your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentItems.map((item, index) => {
        const bgClass = isDark ? "bg-gray-900" : "bg-white";
        const textClass = isDark ? "text-gray-300" : "text-gray-600";

        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className={`relative rounded-2xl overflow-hidden border transition duration-300 shadow-lg hover:shadow-green-500/30 ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Status badge */}
            {item.status === "expired" && (
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow animate-pulse z-10">
                Expired
              </div>
            )}
            {item.status === "nearly expired" && (
              <div className="absolute top-3 right-3 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full shadow z-10">
                Nearly Expired
              </div>
            )}

            {/* Image */}
            <div className="relative h-40">
              <img
                src={item.foodImage}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>

            {/* Content */}
            <div className="p-4 pb-16 space-y-2">
              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h2>

              <div className="flex justify-between text-sm">
                <span className={`${textClass}`}>
                  Category: {item.category}
                </span>
                <span className={`${textClass}`}>Qty: {item.quantity}</span>
              </div>

              {item.addedDate && (
                <p className={`text-xs italic ${textClass}`}>
                  Added {dayjs(item.addedDate).fromNow()}
                </p>
              )}

              {/* User Info */}
              {item.userInfo && (
                <div className="flex items-center gap-3 pt-3 border-t mt-4">
                  <img
                    src={item.userInfo.photoURL}
                    alt={item.userInfo.name}
                    title={item.userInfo.name}
                    className="w-8 h-8 rounded-full object-cover transform hover:scale-105 transition duration-200"
                  />
                  <p className={`text-sm ${textClass}`}>
                    <span className="font-medium">{item.userInfo.name}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Details icon */}
            <Link
              to={`/details/${item._id}`}
              className={`absolute bottom-4 right-4 ${
                isDark
                  ? "text-gray-400 hover:text-green-400"
                  : "text-gray-600 hover:text-blue-800"
              } text-xl`}
              title="View Details"
            >
              <BsInfoSquare />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FridgeCards;
