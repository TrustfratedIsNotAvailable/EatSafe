import React from "react";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16 p-4 flex flex-col items-center">
        <h1 className="text-xl font-semibold">Hello World</h1>
        <p>This is your main app content.</p>
      </div>
    </div>
  );
};

export default MainLayout;
