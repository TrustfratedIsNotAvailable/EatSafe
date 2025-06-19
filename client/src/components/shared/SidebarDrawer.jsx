import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Ensure lucide-react is installed

const SidebarDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleDrawer}
        className="p-4 text-[#1B5E20] text-2xl focus:outline-none"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={toggleDrawer}
          role="presentation"
        ></div>
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <img src="./images/logo.png" alt="logo" className="h-8" />
            <h1 className="text-[#1B5E20] font-bold text-xl">EatSafe</h1>
          </div>
          <button onClick={toggleDrawer} aria-label="Close menu">
            <X className="text-black" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-4 p-4">
          <a
            href="#dashboard"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Home
          </a>
          <a
            href="#dashboard"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Fridge
          </a>
          <a
            href="#dashboard"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#add-item"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Add Food Item
          </a>
          <a
            href="#inventory"
            className="hover:text-[#1B5E20] transition-colors"
          >
            My Inventory
          </a>
          <a
            href="#expiring-soon"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Expiring Soon
          </a>
          <a
            href="#notifications"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Notifications
          </a>
          <a
            href="#settings"
            className="hover:text-[#1B5E20] transition-colors"
          >
            Settings
          </a>
          <a href="#help" className="hover:text-[#1B5E20] transition-colors">
            Help & Support
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SidebarDrawer;
