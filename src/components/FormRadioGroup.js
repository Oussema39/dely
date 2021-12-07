import React from "react";
import { useField } from "formik";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

const FormRadioGroup = ({ name, options, label, ...otherProps }) => {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...otherProps,
    error: !!meta && !!meta.touched && !!meta.error,
  };

  return (
    <FormControl {...config} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row name={name}>
        {options?.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option[0].toUpperCase() + option.slice(1)}
          />
        ))}
      </RadioGroup>
      {meta.error && meta.touched && (
        <Alert icon={false} severity="error">
          {meta.error}
        </Alert>
      )}
    </FormControl>
  );
};

export default FormRadioGroup;
