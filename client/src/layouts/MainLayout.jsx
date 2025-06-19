import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16 p-4 flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
