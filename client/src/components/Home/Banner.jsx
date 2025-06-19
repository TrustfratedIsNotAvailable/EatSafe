import { motion } from "framer-motion";
import { Link } from "react-router";
import bgImage from "../../assets/library-bg.avif";
import TrueFocus from "./TrueFocus";

const Banner = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 backdrop-blur-[2px] z-0" />

      {/* Content */}
      <div className="z-10 text-center text-white max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-3">Welcome to </p>

          <TrueFocus
            sentence="EatSafe Vault"
            manualMode={false}
            blurAmount={5}
            borderColor="white"
            animationDuration={2}
            pauseBetweenAnimations={1}
            color="#43AF50"
          />
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Organize your food, track expiry, reduce waste, and build a healthy
          habit!
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            to="/dashboard"
            className="bg-[#43AF50] text-white px-6 py-3 rounded-md hover:bg-[#369443] transition font-medium"
          >
            🥬 Explore Fridge
          </Link>
          <Link
            to="/add-item"
            className="border-2 border-[#43AF50] text-blue-700 px-6 py-3 rounded-md bg-[#E8F5E980] hover:bg-[#E8F5E9] transition font-medium"
          >
            ➕ Add Food Item
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
