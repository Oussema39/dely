import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormTextField from "./FormTextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ExamList from "./ExamList";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const steps = ["Exam general info", "Choose questions"];

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
  // date: Yup.date().required("Required"),
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

const StepperCopy = ({ components }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [values, setValues] = React.useState({});

  const questionsList = useSelector((state) => state.questions);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
  };

  const handleNext = (values) => {
    if (activeStep === steps.length - 1) setValues({ ...values, questions });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const DatePicker = styled(<input type="date" />)((theme) => ({
    "::-webkit-datetime-edit": {
      color: "transparent",
    },
  }));

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleConfirm = () => {
    console.log({ values, date });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setQuestions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const findComponent = () => {
    const Component = components.find((comp, i) => i === activeStep);
    return Component ? (
      <Component />
    ) : (
      <Typography>Component Not Found</Typography>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {
        activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Please confirm to add the <b> {values.title} exam</b>
            </Typography>
            {values && (
              <ExamList exams={[{ ...values, questions: undefined }]} />
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button color="error" onClick={handleReset}>
                Reset
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={validatorYup}
              onSubmit={onSubmit}
            >
              {(formik) =>
                activeStep === 0 ? (
                  <Form>
                    <FormTextField
                      margin="normal"
                      label="Exam Title"
                      name="title"
                    />
                    <input type="date" />
                    <DatePicker />
                    {/* <FormTextField type="date" margin="normal" name="date" /> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Exam date"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => (
                          <FormTextField
                            name="date"
                            margin="normal"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider> */}
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
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        disabled={
                          !formik.dirty || (formik.dirty && !formik.isValid)
                        }
                        onClick={() => {
                          handleNext();
                          console.log(formik);
                        }}
                      >
                        {activeStep === steps.length - 1 ? "Overview" : "Next"}
                      </Button>
                    </Box>
                  </Form>
                ) : (
                  <Form>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel id="demo-multiple-chip-label">
                        Chip
                      </InputLabel>
                      <Select
                        id="question"
                        multiple
                        value={questions}
                        onChange={handleChange}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            fullWidth
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        // MenuProps={MenuProps}
                      >
                        {questionsList.map(({ question: name }) => (
                          <MenuItem
                            key={name}
                            value={name}
                            // style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        disabled={questions.length <= 0}
                        onClick={() => handleNext(formik.values)}
                      >
                        {activeStep === steps.length - 1 ? "Overview" : "Next"}
                      </Button>
                    </Box>
                  </Form>
                )
              }
            </Formik>
          </React.Fragment>
        )
        //  (
        //   <React.Fragment>
        //     <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        //     {findComponent()}
        //     <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        //       <Box sx={{ flex: "1 1 auto" }} />
        //       <Button onClick={handleNext}>
        //         {activeStep === steps.length - 1 ? "Overview" : "Next"}
        //       </Button>
        //     </Box>
        //   </React.Fragment>
        // )
      }
    </Box>
  );
};

export default StepperCopy;
