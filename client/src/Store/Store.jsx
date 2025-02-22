import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Redux/userSlice";
import adminSlice from "../Redux/adminSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
  },
});
