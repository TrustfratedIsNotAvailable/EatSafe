import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16 p-4 flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
