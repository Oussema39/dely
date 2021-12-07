import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    setExams: (state, { payload }) => payload,
  },
});

export const { setExams } = examsSlice.actions;

export default examsSlice.reducer;
