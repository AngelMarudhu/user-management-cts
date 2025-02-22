import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/admin";

export const getAllUsers = createAsyncThunk(
  "get/all/users",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-users`, {
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

export const deleteUser = createAsyncThunk(
  "delete/user",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/delete-user/${id}`, {
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

export const updateUser = createAsyncThunk(
  "update/user",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/update-user/${id}`, data, {
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
