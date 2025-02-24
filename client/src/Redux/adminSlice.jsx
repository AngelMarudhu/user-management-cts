import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers, updateUser } from "../Feature/adminFeature";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
  isDeleted: false,
  userForUpdate: null,
  isUpdated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userForUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (user) => user._id !== action.payload.user._id
      );
      state.isDeleted = true;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) => {
        if (user._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        } else {
          return user;
        }
      });
      state.isUpdated = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.isUpdated = false;
    });
  },
});

export const { updateUserId } = adminSlice.actions;

export default adminSlice.reducer;
