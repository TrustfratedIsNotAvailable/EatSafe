import { motion } from "framer-motion";
import { FaBell, FaBoxOpen, FaChartBar, FaHandsHelping } from "react-icons/fa";

// const features = [
//   {
//     title: "Track Expiry Dates",
//     description:
//       "Get notified when items are about to expire — stay ahead and reduce waste.",
//     emoji: "⏳",
//   },
//   {
//     title: "Organize Your Fridge",
//     description:
//       "Categorize and track items easily with filters, search, and tags.",
//     emoji: "🗂️",
//   },
//   {
//     title: "Add Notes & Monitor Usage",
//     description:
//       "Leave reminders or meal ideas per item — helpful for smart planning.",
//     emoji: "📝",
//   },
//   {
//     title: "Get Expiry Alerts",
//     description:
//       "Visual highlights for nearly expired and expired items. Never miss a date.",
//     emoji: "🚨",
//   },
//   {
//     title: "Visualize Your Inventory",
//     description:
//       "Card-based layout shows you exactly what’s inside — no surprises.",
//     emoji: "📦",
//   },
//   {
//     title: "Secure Your Vault",
//     description: "Login safely with email or Google. Your data stays yours.",
//     emoji: "🔐",
//   },
// ];
const features = [
  {
    icon: <FaBoxOpen className="text-3xl text-[#1B5E20]" />,
    title: "Track Food Items",
    desc: "Easily add and manage food with expiry dates and categories.",
  },
  {
    icon: <FaBell className="text-3xl text-[#1B5E20]" />,
    title: "Expiry Alerts",
    desc: "Get notified about items that are expiring soon or have expired.",
  },
  {
    icon: <FaChartBar className="text-3xl text-[#1B5E20]" />,
    title: "Visual Stats",
    desc: "Monitor your inventory with charts and summaries.",
  },
  {
    icon: <FaHandsHelping className="text-3xl text-[#1B5E20]" />,
    title: "Share Extras",
    desc: "Donate surplus food to reduce waste and help others.",
  },
];
const Features = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[#2E7D32] mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What You Can Do with
          <span className="text-[#43AF50]">EatSafe Vault</span>
        </motion.h2>
        <p className="text-gray-600 mb-12">
          Take control of your kitchen — track, organize, and optimize your food
          life.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              // className={`p-6 text-left transition transform hover:-translate-y-0.5 rounded-xl shadow-sm ${
              //   idx === features.length - 1
              //     ? "bg-[#E8F5E9]"
              //     : "bg-white"
              // }`}
              className="p-6 text-left transition transform hover:-translate-y-0.5 rounded-xl bg-white shadow-sm text-[#43AF50]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
