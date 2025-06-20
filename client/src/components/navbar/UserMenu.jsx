import React from "react";
import { Link } from "react-router";

const UserMenu = ({ user, logout }) => {
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
          <img
            src={user?.photoURL}
            alt="User avatar"
          />
        </div>
      </button>
      <ul
        tabIndex={0}
        className={`menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg rounded-box w-56 space-y-1 bg-gray-50`}
      >
        <li>
          <Link to="/my-profile">Profile</Link>
        </li>
        <li>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
