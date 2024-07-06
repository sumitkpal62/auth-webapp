import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorDetails: null,
  loading: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailed: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorDetails = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailed } = userSlice.actions;

export default userSlice.reducer;
