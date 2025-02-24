import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updatePicture,
} from "../Feature/userFeature";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || [],
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isError: false,
  error: null,
  isRegistered: false,
  isProfilePictureUpdated: false,
  isLoggedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    // user register slice

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isRegistered = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRegistered = true;
      state.user = action.payload;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isRegistered = false;
      state.error = action.payload.error;
    });

    // user login slice

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isLoggedin = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedin = true;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedin = false;
      state.error = action.payload.error;
    });

    // get user profile slice
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // update profile picture slice

    builder.addCase(updatePicture.pending, (state) => {
      state.isProfilePictureUpdated = false;
      state.isLoading = true;
    });

    builder.addCase(updatePicture.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isProfilePictureUpdated = true;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(updatePicture.rejected, (state, action) => {
      state.isLoading = false;
      state.isProfilePictureUpdated = false;
      state.error = action.payload.error;
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
