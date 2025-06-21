import React from "react";
import SidebarDrawer from "../navbar/SidebarDrawer";
import HorizontalNav from "../navbar/HorizontalNav";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../navbar/UserMenu";
import ThemeToggleButton from "../others/ThemeToggleButton";
import { useTheme } from "../../hooks/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const headerBg = isDark
    ? "bg-gray-900 text-white shadow-lg"
    : "bg-white text-black shadow";

  return (
    <header
      className={`w-full flex justify-between items-center p-4 fixed top-0 left-0 z-50 h-16 ${headerBg} transition-colors duration-300`}
    >
      {/* Mobile Menu */}
      <div className="md:hidden">
        <SidebarDrawer />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="logo"
            className={`h-8 ${isDark ? "bg-white rounded-lg" : ""}`}
          />
          <h2
            className={`font-bold text-2xl mb-2  ${
              isDark ? "text-white" : "text-[#1B5E20]"
            }`}
          >
            EatSafe
          </h2>
        </div>
        <HorizontalNav />
      </div>

      {/* Theme toggle and user menu */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <UserMenu user={user} logout={logout} />
      </div>
    </header>
  );
};

export default Navbar;
