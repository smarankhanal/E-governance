import { configureStore } from "@reduxjs/toolkit";
import passportReducer from "./slice/passportSlice";
export const store = configureStore({
  reducer: {
    passport: passportReducer,
  },
});
