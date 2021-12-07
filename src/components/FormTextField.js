import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const FormTextField = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...otherProps,
    fullWidth: true,
    error: !!meta && !!meta.touched && !!meta.error,
    helperText: meta && meta.touched && meta.error ? meta.error : "",
  };

  return <TextField {...config} />;
};

export default FormTextField;
