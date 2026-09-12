import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationType: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,

  reducers: {
    setApplicationType: (state, action) => {
      state.applicationType = action.payload;
    },

    clearApplicationType: (state) => {
      state.applicationType = null;
    },
  },
});

export const { setApplicationType, clearApplicationType } =
  applicationSlice.actions;

export default applicationSlice.reducer;
