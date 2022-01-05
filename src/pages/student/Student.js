import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartExam from "./StartExam";
import StudentHome from "./StudentHome";

const Student = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#f2f2f2",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: theme.spacing(15),
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10}>
          <Link to="/student/startexam">Start Exam</Link>
          <Link to="/what">Start Exam</Link>
          <Routes>
            <Route
              path="/student/:examId"
              element={<StartExam exam={{}} />}
            ></Route>
            <Route path="/student/:examId" element={<div>What</div>}></Route>
            <Route path="/" element={<StudentHome />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Student;
