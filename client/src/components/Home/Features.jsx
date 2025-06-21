import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaChartBar, FaEdit, FaStar } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext"; // adjust import if needed

const features = [
  {
    icon: <FaBoxOpen className="text-3xl" />,
    title: "Track Food Items",
    desc: "Easily add and manage food with expiry dates and categories.",
  },
  {
    icon: <FaChartBar className="text-3xl" />,
    title: "Visual Stats",
    desc: "Monitor your inventory with charts and summaries.",
  },
  {
    icon: <FaEdit className="text-3xl" />,
    title: "Personal Notes",
    desc: "Keep track of thoughts or reminders by adding notes to your own food entries.",
  },
  {
    icon: <FaStar className="text-3xl" />,
    title: "User Reviews",
    desc: "See feedback from real users about their food management experience.",
  },
];

const Features = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Color classes for light/dark mode
  const iconColorClass = isDark ? "text-green-400" : "text-[#1B5E20]";
  const sectionBgClass = isDark ? "bg-gray-900" : "bg-white";
  const titleColorClass = isDark ? "text-green-300" : "text-[#2E7D32]";
  const highlightColorClass = isDark ? "text-green-400" : "text-[#43AF50]";
  const textPrimaryClass = isDark ? "text-gray-100" : "text-gray-800";
  const textSecondaryClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-800" : "bg-white";
  const cardShadowClass = isDark ? "shadow-md shadow-green-900" : "shadow-sm";

  return (
    <section className={`${sectionBgClass} py-16 px-4 sm:px-8`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold mb-4 ${titleColorClass}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What You Can Do with{" "}
          <span className={highlightColorClass}>EatSafe Vault</span>
        </motion.h2>
        <p className={`${textSecondaryClass} mb-12`}>
          Take control of your kitchen — track, organize, and optimize your food
          life.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`p-6 text-left transition transform hover:-translate-y-0.5 rounded-xl ${cardBgClass} ${cardShadowClass} ${highlightColorClass}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`mb-4 flex justify-center ${iconColorClass}`}>
                {React.cloneElement(feature.icon, {
                  className: `text-3xl ${iconColorClass}`,
                })}
              </div>
              <h3 className={`${textPrimaryClass} text-lg font-semibold mb-2`}>
                {feature.title}
              </h3>
              <p className={`${textSecondaryClass} text-sm`}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
