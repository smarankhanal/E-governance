import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passportType: null,
  selectedDocument: null,
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

    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },

    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
    },

    clearPassportData: (state) => {
      state.passportType = null;
      state.selectedDocument = null;
    },
  },
});

export const {
  setPassportType,
  clearPassportType,
  setSelectedDocument,
  clearSelectedDocument,
  clearPassportData,
} = passportSlice.actions;

export default passportSlice.reducer;
