import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ expiryDate }) => {
  return (
    <div>
      <strong>Expires In:</strong>{" "}
      <Countdown
        date={new Date(expiryDate)}
        renderer={({ completed, days, hours, minutes, seconds }) => {
          return completed ? (
            <span className="text-red-600 font-semibold">Already expired</span>
          ) : (
            <span>{days}d {hours}h {minutes}m {seconds}s</span>
          );
        }}
      />
    </div>
  );
};

export default CountdownTimer;
