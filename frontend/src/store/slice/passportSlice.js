import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passportType: null,
};

const passportSlice = createSlice({
  name: "passport",
  initialState,

  reducers: {
    setPassportType: (state, action) => {
      state.passportType = action.payload;
    },

    clearPassportType: (state) => {
      state.passportType = null;
    },
  },
});

export const { setPassportType, clearPassportType } = passportSlice.actions;

export default passportSlice.reducer;
