import React from "react";
import NavBar from "./AppBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
