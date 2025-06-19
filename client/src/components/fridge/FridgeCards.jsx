import React from "react";
import { Link } from "react-router";

const FridgeCards = ({currentItems}) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentItems.map((item) => {
        const isExpired = new Date(item.expiryDate) < new Date();

        return (
          <div key={item._id} className="relative">
            {isExpired && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                Expired
              </div>
            )}
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
              <img
                src={item.foodImage}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Category: {item.category}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <Link to={`/details/${item._id}`} className="btn btn-outline btn-sm w-full mt-2">
                  See Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FridgeCards;