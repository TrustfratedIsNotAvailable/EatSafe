import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../hooks/ThemeContext";

const UserMenu = ({ user, logout }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!user) {
    return (
      <Link
        to="/login"
        className="bg-[#1B5E20] text-white px-4 py-2 rounded-xl hover:bg-[#388E3C] transition"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        aria-label="User menu"
      >
        <div className="w-10 rounded-full">
          <img src={user?.photoURL} alt="User avatar" />
        </div>
      </button>
      <ul
        tabIndex={0}
        className={`menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg rounded-box w-56 space-y-1 ${
          isDark ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <li>
          <Link
            to="/my-profile"
            className={`hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-2 py-1`}
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="text-red-500 hover:underline hover:text-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
