import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../../hooks/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="transition-transform duration-300 hover:scale-110"
    >
      {theme === "dark" ? (
        <IoSunnyOutline size={36} />
      ) : (
        <IoMoonOutline size={30} />
      )}
    </button>
  );
};

export default ThemeToggleButton;
