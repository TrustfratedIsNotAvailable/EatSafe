import React from "react";
import Countdown from "react-countdown";
import { FiClock, FiCalendar, FiWatch } from "react-icons/fi";
import { motion } from "framer-motion";

const CountdownTimer = ({ expiryDate }) => {
  return (
    <div className="mt-6 p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-gray-800 dark:border-green-400 max-w-xs w-full">
      <strong className="block mb-3 text-green-700 dark:text-green-300 text-lg flex items-center gap-2">
        <FiClock /> Expires In:
      </strong>
      <Countdown
        date={new Date(expiryDate)}
        renderer={({ completed, days, hours, minutes, seconds }) => {
          if (completed) {
            return (
              <span className="text-red-600 font-bold text-xl flex items-center gap-2">
                <FiClock /> Already expired
              </span>
            );
          }

          return (
            <div className="flex flex-wrap gap-3 text-green-800 dark:text-green-200 font-semibold text-xl">
              {/* Days */}
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-700 px-3 py-1 rounded shadow-sm min-w-[55px] justify-center">
                <FiCalendar /> {days}{" "}
                <span className="text-sm font-normal">d</span>
              </div>
              {/* Hours */}
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-700 px-3 py-1 rounded shadow-sm min-w-[55px] justify-center">
                <FiWatch /> {hours}{" "}
                <span className="text-sm font-normal">h</span>
              </div>
              {/* Minutes */}
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-700 px-3 py-1 rounded shadow-sm min-w-[55px] justify-center">
                <FiClock /> {minutes}{" "}
                <span className="text-sm font-normal">m</span>
              </div>

              {/* Animate seconds only */}
              <motion.div
                key={seconds}
                initial={{ y: -6, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1 bg-green-100 dark:bg-green-700 px-3 py-1 rounded shadow-sm min-w-[55px] justify-center"
              >
                <FiClock /> {seconds}{" "}
                <span className="text-sm font-normal">s</span>
              </motion.div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CountdownTimer;
