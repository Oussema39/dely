import React, { useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { Box, useTheme } from "@mui/system";
import ExamList from "../../components/ExamList";
import Section from "../../components/Section";
import AddIcon from "@mui/icons-material/Add";
import { Item } from "../../components/Section";
import AddExamForm from "../../components/AddExamForm";

const Teacher = () => {
  const theme = useTheme();
  const [displayForm, setDisplayForm] = useState(false);

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
            <ExamList />
          </Section>
          <Box component={Item}>
            <Collapse in={displayForm}>
              <AddExamForm setDisplayForm={setDisplayForm} />
            </Collapse>
            <Button
              onClick={() => setDisplayForm((prv) => !prv)}
              disableRipple
              disabled={displayForm}
              variant="contained"
              endIcon={<AddIcon />}
            >
              Add Exam
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Teacher;
