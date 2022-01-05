import { configureStore } from "@reduxjs/toolkit";
import examsReducer from "../features/exams/examsSlice";
import questionReducer from "../features/questions/questionsSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    exams: examsReducer,
    questions: questionReducer,
  },
});
