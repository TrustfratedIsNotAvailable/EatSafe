import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/ThemeContext";

const NavLinks = ({ className = "" }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTestimonialClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/#testimonials");
    else {
      const section = document.getElementById("testimonials");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path, hash = "") => {
    if (hash) return location.pathname === path && location.hash === hash;
    return location.pathname === path;
  };

  const baseClass = "relative transition-colors py-1";

  const activeClass = isDark
    ? "text-green-400 font-semibold after:absolute after:content-[''] after:-bottom-1 after:left-0 after:right-0 after:h-1 after:rounded-md after:bg-green-500"
    : "text-[#1B5E20] font-semibold after:absolute after:content-[''] after:-bottom-1 after:left-0 after:right-0 after:h-1 after:rounded-md after:shadow-[0_4px_10px_-2px_rgba(27,94,32,0.8)]";

  const hoverClass = isDark
    ? "hover:text-green-400 hover:after:absolute hover:after:content-[''] hover:after:-bottom-1 hover:after:left-0 hover:after:right-0 hover:after:h-1 hover:after:rounded-md hover:after:bg-green-600"
    : "hover:text-[#1B5E20] hover:after:absolute hover:after:content-[''] hover:after:-bottom-1 hover:after:left-0 hover:after:right-0 hover:after:h-1 hover:after:rounded-md hover:after:shadow-[0_2px_6px_-1px_rgba(27,94,32,0.6)]";

  return (
    <div className={`flex flex-col md:flex-row gap-6 ${className}`}>
      <a
        href="/"
        onClick={handleHomeClick}
        className={`${baseClass} ${isActive("/") ? activeClass : hoverClass}`}
      >
        Home
      </a>

      {user ? (
        <>
          <Link
            to="/fridge"
            className={`${baseClass} ${
              isActive("/fridge") ? activeClass : hoverClass
            }`}
          >
            Fridge
          </Link>
          <Link
            to="/dashboard"
            className={`${baseClass} ${
              isActive("/dashboard") ? activeClass : hoverClass
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/add-item"
            className={`${baseClass} ${
              isActive("/add-item") ? activeClass : hoverClass
            }`}
          >
            Add Food Item
          </Link>
          <Link
            to="/my-item"
            className={`${baseClass} ${
              isActive("/my-item") ? activeClass : hoverClass
            }`}
          >
            My Inventory
          </Link>
        </>
      ) : (
        <a
          href="#testimonials"
          onClick={handleTestimonialClick}
          className={`${baseClass} ${
            isActive("/", "#testimonials") ? activeClass : hoverClass
          }`}
        >
          User Feedback
        </a>
      )}
    </div>
  );
};

export default NavLinks;
