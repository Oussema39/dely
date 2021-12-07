import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { Form, Formik } from "formik";
import FormTextField from "./FormTextField";
import * as Yup from "yup";
import FormRadioGroup from "./FormRadioGroup";
import { getAllEmails, register } from "../api/UserApi";
import SnackBar from "./SnackBar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const roleOptions = ["teacher", "student"];

const Register = () => {
  //Store context
  const dispatch = useDispatch();

  //State
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  //Subscriptions, Asynchronous tasks controller
  const controller = new AbortController();
  const { signal } = controller;

  //Fetch all emails to check for email validation
  useEffect(() => {
    (async () => {
      const _emails = (await getAllEmails(signal)) || [];
      setEmails(_emails);
    })();
    return () => {
      controller.abort();
    };
  }, []);

  //Validating Regsiter Form With Yup
  const validatorYup = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid email adress")
      .required("Required")
      .notOneOf(emails, "Email already used"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 chars"),
    confirmPassword: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 chars")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const user = await register(values, signal);
    if (user) {
      dispatch(setUser(user));
      localStorage.setItem("token", user.email);
      return;
    }
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: "primary.main", width: 50, height: 50 }}
          color="primary"
        >
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validatorYup}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormTextField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      name="password"
                      type={showPass ? "text" : "password"}
                      label="Password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPass((prv) => !prv)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      name="confirmPassword"
                      type={showPass ? "text" : "password"}
                      label="Confirm Password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPass((prv) => !prv)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showConfirmPass ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormRadioGroup
                      options={roleOptions}
                      name="role"
                      label="Role"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={formik.isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link component="p" variant="body2">
                      <RouterLink to="/login" style={{ color: "inherit" }}>
                        Already have an account? Sign in
                      </RouterLink>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
      {open && (
        <SnackBar
          message="An Error Occured"
          setOpen={setOpen}
          open={open}
          severity="error"
        />
      )}
      <Copyright />
    </Container>
  );
};

export default Register;
