import { Button, TextField, Typography } from "@mui/material";
// import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormTextField from "./FormTextField";
import Section from "./Section";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as Yup from "yup";

const initialValues = {
  title: "",
  date: "",
  duration: "",
  note: "",
};

const validatorYup = Yup.object().shape({
  title: Yup.string()
    .required("Required")
    .min(4, "Title too short")
    .max(50, "Title too long"),
  date: Yup.date().required("Required"),
  duration: Yup.number()
    .required("Required")
    .test(
      "duration",
      "Duration should be between 5 and 120 (minutes)",
      (value) => value >= 5 && value <= 120
    ),
  note: Yup.number()
    .required("Required")
    .test(
      "note",
      "Note should be between 1 and 100",
      (value) => value > 0 && value < 100
    ),
});

const AddExamForm = ({ setDisplayForm }) => {
  const [date, setDate] = useState(null);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
  };

  const onCancel = (handleReset) => {
    setDisplayForm(false);
    handleReset();
  };

  return (
    <Section>
      <Typography component="h1" variant="h5">
        Add Exam
      </Typography>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validatorYup}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <FormTextField
              margin="normal"
              label="Exam Title"
              name="title"
              autoFocus
            />
            {/* <FormTextField
              margin="normal"
              name="date"
              type="date"
              label="Exam date"
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Exam date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <FormTextField name="date" margin="normal" {...params} />
                )}
              />
            </LocalizationProvider>
            <FormTextField
              margin="normal"
              name="duration"
              type="number"
              placehoder="mm"
              label="Exam duration"
            />

            <FormTextField
              margin="normal"
              name="note"
              type="number"
              label="Exam note"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // disabled={formik.isSubmitting}
            >
              Confirm exam
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              // disabled={formik.isSubmitting}
              onClick={() => onCancel(formik.handleReset)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Section>
  );
};
export default AddExamForm;
