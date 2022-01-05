import React from "react";
import { Route } from "react-router-dom";
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
