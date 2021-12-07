import React from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import ExamList from "../../components/ExamList";
import Section from "../../components/Section";

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
            <ExamList />
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Student;
