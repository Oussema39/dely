import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const Section = ({ children, ...rest }) => {
  return <Item {...rest}>{children}</Item>;
};

export default Section;
