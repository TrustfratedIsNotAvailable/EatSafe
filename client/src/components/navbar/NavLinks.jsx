import React from "react";
import { Link } from "react-router";

const NavLinks = ({ className = "" }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
      <Link to="/" className="hover:text-[#1B5E20] transition-colors">
        Home
      </Link>
      <Link to="/fridge" className="hover:text-[#1B5E20] transition-colors">
        Fridge
      </Link>
      <Link to={"/dashboard"} className="hover:text-[#1B5E20] transition-colors">
        Dashboard
      </Link>
      <Link to="/add-item" className="hover:text-[#1B5E20] transition-colors">
        Add Food Item
      </Link>
      <Link to="/my-item" className="hover:text-[#1B5E20] transition-colors">
        My Inventory
      </Link>
      {/* <a href="#expiringSoon" className="hover:text-[#1B5E20] transition-colors">
        Expiring Soon
      </a> */}
    </div>
  );
};

export default NavLinks;
