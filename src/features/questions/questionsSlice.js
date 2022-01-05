import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, { payload }) => payload,
  },
});

export const { setQuestions } = questions.actions;

export default questions.reducer;
