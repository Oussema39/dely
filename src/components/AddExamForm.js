import { Button, TextField, Typography } from "@mui/material";
// import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormTextField from "./FormTextField";
import Section from "./Section";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import StepperCopy from "./StepperCopy";

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

const ExamGeneralDataForm = () => {
  const [date, setDate] = useState(null);
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
  };

  return (
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
        </Form>
      )}
    </Formik>
  );
};

const AddExamForm = () => {
  const [open, setOpen] = useState(true);

  // const onCancel = (handleReset) => {
  //   setDisplayForm(false);
  //   handleReset();
  // };

  const handleClose = () => setOpen(false);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent>
        <StepperCopy components={[ExamGeneralDataForm]} />
      </DialogContent>
      {/* <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose}>Confirm Exam</Button>
      </DialogActions> */}
    </Dialog>
  );
};
export default AddExamForm;
