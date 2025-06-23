// import React from "react";
// import Navbar from "../components/shared/Navbar";
// import { Outlet } from "react-router";
// import Footer from "../components/shared/Footer";

// const MainLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="pt-16 min-h-screen">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;

import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import { useTheme } from "../hooks/ThemeContext";

const MainLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      <Navbar />
      <div
        className={`pt-16 min-h-screen transition-colors duration-300 ${
          isDark ? "bg-gray-950 text-white" : "bg-white text-black"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
