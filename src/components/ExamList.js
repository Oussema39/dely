import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ExamList = () => {
  const exams = useSelector(({ exams }) => exams);
  const keys =
    Array.isArray(exams) && exams.length > 0 && Object.keys(exams[0]);
  const firstKey = keys && keys.shift();

  return Array.isArray(exams) && exams.length > 0 ? (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exam</TableCell>
            {Object.keys(exams[0])
              ?.slice(1)
              ?.map((key) => (
                <TableCell
                  sx={{ textTransform: "capitalize" }}
                  align="right"
                  key={key}
                >
                  {key === "date"
                    ? "date (dd-mm-yy)"
                    : key === "duration"
                    ? "duration (minutes)"
                    : key}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {exams?.map((exam, index) => (
            <TableRow
              key={exam}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {exam[firstKey]}
              </TableCell>
              {keys.map((key, i) => (
                <TableCell key={i} align="right">
                  {exam[key]}
                </TableCell>
              ))}
              {/* <TableCell align="right">{exam[keys[index]]}</TableCell>
              <TableCell align="right">{exam.duration}</TableCell>
              <TableCell align="right">{exam.note}</TableCell>
              <TableCell align="right">{exam.teacher_id}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Alert severity="info">No Exams To Show For Now</Alert>
  );
  // return <>testing exams</>;
};

export default ExamList;
