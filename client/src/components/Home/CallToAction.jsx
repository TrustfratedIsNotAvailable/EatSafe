import React from "react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="w-full mt-16 bg-[#E8F5E9] py-10 px-6 rounded-t-xl text-center shadow-md border border-green-200">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1B5E20] mb-4">
        Ready to reduce food waste?
      </h2>
      <p className="text-gray-700 mb-6">
        Start tracking your food, avoid spoilage, and make every item count.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="bg-[#1B5E20] hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
        >
          Get Started
        </Link>
        <Link
          to="/dashboard"
          className="border border-[#1B5E20] text-[#1B5E20] font-semibold py-2 px-6 rounded-full hover:bg-[#C8E6C9] transition duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
