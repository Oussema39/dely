import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import Section from "../../components/Section";
import Dashboard from "./Dashboard";

const Admin = () => {
  const theme = useTheme();

  return <Dashboard />;
};

export default Admin;
