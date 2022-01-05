import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import ExamList from "../../components/ExamList";
import Section from "../../components/Section";
import { IconButton, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";

const StudentHome = () => {
  const exams = useSelector(({ exams }) => exams);

  return (
    <>
      <Section>
        <TextField
          type="text"
          // value={search}
          id="search"
          fullWidth
          placeholder="search for exams"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Section>

      <Section>
        <ExamList exams={exams} />
      </Section>
    </>
  );
};

export default StudentHome;
