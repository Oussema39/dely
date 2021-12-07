import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Student from "./pages/student/Student";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "./api/UserApi";
import { setUser } from "./features/user/userSlice";
import { setExams } from "./features/exams/examsSlice";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getStudentExams, getTeacherExams } from "./api/ExamApi";
import Teacher from "./pages/teacher/Teacher";

export const LoaderContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(false);
  const setLoader = (loaderState) => {
    setLoading(loaderState);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!localStorage.getItem("token")) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        return;
      }
      const user = await getUserByEmail(localStorage.getItem("token"));
      const exams =
        user.role.toLowerCase() === "student"
          ? await getStudentExams(user?.id)
          : user.role.toLowerCase()
          ? await getTeacherExams(user?.id)
          : [];
      exams && dispatch(setExams(exams));
      user && dispatch(setUser(user));

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })();
  }, []);

  const role = useSelector(({ user }) => user?.role);

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <LoaderContext.Provider value={setLoader}>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={!role ? <Register /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!role ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/"
            element={
              !role ? (
                <Navigate to="/login" />
              ) : (
                <MainLayout>
                  {role === "student" ? (
                    <Student />
                  ) : role === "teacher" ? (
                    <Teacher />
                  ) : (
                    <Navigate to="/login" />
                  )}
                  {/* <h1>Welcome</h1> */}
                </MainLayout>
              )
            }
          ></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Router>
    </LoaderContext.Provider>
  );
};

export default App;
