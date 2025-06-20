import React from "react";
import SidebarDrawer from "../navbar/SidebarDrawer";
import HorizontalNav from "../navbar/HorizontalNav";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../navbar/UserMenu";
import ThemeToggleButton from "../others/ThemeToggleButton";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center p-4 fixed top-0 left-0 bg-white z-50 h-16 shadow">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <SidebarDrawer />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <div className="flex items-center space-x-2">
          <img src="./images/logo.png" alt="logo" className="h-8" />
          <h1 className="text-[#1B5E20] font-bold text-xl">EatSafe</h1>
        </div>
        <HorizontalNav />
      </div>


      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <UserMenu user={user} logout={logout} />
      </div>
    </header>
  );
};

export default Navbar;
