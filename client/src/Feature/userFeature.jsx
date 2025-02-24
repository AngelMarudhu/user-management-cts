import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://user-management-cts.onrender.com/api/auth";
const API_URL = "http://localhost:5001/api/auth";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-profile`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);

export const updatePicture = createAsyncThunk(
  "updatePicture",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/updateProfilePicture`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
      });
    }
  }
);
