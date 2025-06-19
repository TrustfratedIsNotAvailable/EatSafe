import { Link } from "react-router";
import SidebarDrawer from "./SidebarDrawer";
import HorizontalNav from "./HorizontalNav";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 fixed top-0 left-0 bg-white z-50 h-16">
      {/* Left side */}
      <SidebarDrawer />

      {/* Right: Login Button */}
      <div className="ml-auto">
        <Link
          to={"/login"}
          className="bg-[#1B5E20] text-white px-4 py-2 rounded-xl hover:bg-[#388E3C] transition w-full"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
