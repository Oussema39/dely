import React, { useState, useContext } from "react";
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
import FormTextField from "./FormTextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../api/UserApi";
import { useDispatch } from "react-redux";
import SnackBar from "./SnackBar";
import { setUser } from "../features/user/userSlice";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoaderContext } from "../App";
import { getStudentExams, getTeacherExams } from "../api/ExamApi";
import { setExams } from "../features/exams/examsSlice";

const initialValues = {
  email: "",
  password: "",
};

const validatorYup = Yup.object().shape({
  email: Yup.string().email("Invalid email adress").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 chars"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const setLoader = useContext(LoaderContext);

  const onSubmit = async (values) => {
    const user = await login(values);
    if (user) {
      setLoader(true);
      const exams =
        user.role.toLowerCase() === "student"
          ? await getStudentExams(user?.id)
          : user.role.toLowerCase()
          ? await getTeacherExams(user?.id)
          : [];
      exams && dispatch(setExams(exams));
      setTimeout(() => {
        dispatch(setUser(user));
        setLoader(false);
      }, 1000);
      localStorage.setItem("token", user.email);
      return;
    }
    setLoader(false);
    setSnackMessage("Wrong Credentials");
    setOpen(true);
    setLoggedIn(!!user);
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
          Sign in
        </Typography>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validatorYup}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Box sx={{ mt: 1 }}>
              <Form>
                <FormTextField
                  margin="normal"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <FormTextField
                  margin="normal"
                  name="password"
                  label="Password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={formik.isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link component="p" variant="body2">
                      <RouterLink to="/register" style={{ color: "inherit" }}>
                        {"Don't have an account? Sign Up"}
                      </RouterLink>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
      {snackMessage && (
        <SnackBar
          open={open}
          setOpen={setOpen}
          message={snackMessage}
          severity={loggedIn ? "success" : "error"}
        />
      )}
      <Copyright />
    </Container>
  );
};

export default Login;
