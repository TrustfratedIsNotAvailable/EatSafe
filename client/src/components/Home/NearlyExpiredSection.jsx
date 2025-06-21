import React from "react";
import { motion } from "framer-motion";
import { nearlyExpiredItems } from "../data/nearlyExpiredData";

const NearlyExpiredSection = () => {
  return (
    <section className="w-full bg-[#FFF9EC] py-16 px-4 sm:px-8">
      <div className=" max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#D97706] mb-4">
          ⏳ Nearly Expired Items
        </h2>
        <p className="text-gray-700 mb-10">
          These items are expiring soon — use them before it’s too late!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearlyExpiredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-white border-l-4 border-yellow-400 shadow-sm rounded-xl p-4 text-left hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">
                Expiring in{" "}
                <span className="font-bold text-yellow-600">
                  {item.daysLeft} {item.daysLeft === 1 ? "day" : "days"}
                </span>
              </p>
              <p className="text-xs text-gray-500">Expiry: {item.expiryDate}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearlyExpiredSection;
