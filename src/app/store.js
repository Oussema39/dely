import { configureStore } from "@reduxjs/toolkit";
import examsReducer from "../features/exams/examsSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    exams: examsReducer,
  },
});
