import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
export const getCategories = createAsyncThunk(
  "categories",
  async (_, { rejectWithValue }) => {
    // const token = localStorage.getItem("ACCESS_TOKEN");
    // API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/categories`);
      console.log(response);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCourseCategories = createAsyncThunk(
  "courseCategories",
  async (_, { rejectWithValue }) => {
    // const token = localStorage.getItem("ACCESS_TOKEN");
    // API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/courseCategories`);
      console.log(response);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoriesCourse: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          categories: action.payload.data,
        };
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getCourseCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseCategories.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          categoriesCourse: action.payload.data,
        };
      })
      .addCase(getCourseCategories.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export default categoriesSlice.reducer;
