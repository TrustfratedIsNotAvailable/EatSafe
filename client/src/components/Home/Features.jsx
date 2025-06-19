import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Smart Expiry Management",
//     description:
//       "Track expiry dates, get visual alerts for nearly expired items, and stay ahead with timely notifications — reduce waste effortlessly.",
//     emoji: "⏳",
//   },
//   {
//     title: "Fridge Organization & Notes",
//     description:
//       "Easily categorize food, search and filter your inventory, and attach helpful notes or meal plans for smarter usage.",
//     emoji: "🗂️",
//   },
//   {
//     title: "Visualize Your Inventory",
//     description:
//       "View your items in a visual card layout and monitor by category to keep your kitchen organized.",
//     emoji: "📦",
//   },
// ];

const features = [
  {
    title: "Track Expiry Dates",
    description:
      "Get notified when items are about to expire — stay ahead and reduce waste.",
    emoji: "⏳",
  },
  {
    title: "Organize Your Fridge",
    description:
      "Categorize and track items easily with filters, search, and tags.",
    emoji: "🗂️",
  },
  {
    title: "Add Notes & Monitor Usage",
    description:
      "Leave reminders or meal ideas per item — helpful for smart planning.",
    emoji: "📝",
  },
  {
    title: "Get Expiry Alerts",
    description:
      "Visual highlights for nearly expired and expired items. Never miss a date.",
    emoji: "🚨",
  },
  {
    title: "Visualize Your Inventory",
    description:
      "Card-based layout shows you exactly what’s inside — no surprises.",
    emoji: "📦",
  },
  {
    title: "Secure Your Vault",
    description: "Login safely with email or Google. Your data stays yours.",
    emoji: "🔐",
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
          What You Can Do with{" "}
          <span className="text-[#43AF50]">EatSafe Vault</span>
        </motion.h2>
        <p className="text-gray-600 mb-12">
          Take control of your kitchen — track, organize, and optimize your food
          life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              // className="p-6 text-left transition transform hover:-translate-y-1 hover:shadow-md bg-white border-b-2 border-yellow-200 text-[#43AF50]"
              className={`p-6 text-left transition transform hover:-translate-y-1 ${
                idx === features.length - 1
                  ? "bg-white shadow-sm shadow-[#43AF50] text-[#43AF50]"
                  : "bg-[#43AF50] text-white"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
