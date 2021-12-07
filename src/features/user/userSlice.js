import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => payload,
  },
});

export const useSelectStatic = (selector) =>
  useSelector(({ user }) =>
    Array.isArray(selector)
      ? selector
          .map((_selector) =>
            user[_selector] !== undefined ? user[_selector] : ""
          )
          .filter((userField) => userField !== "")
      : user[String(selector)]
  );

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
