import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
export const getProfs = createAsyncThunk(
  "getProfs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/profs");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
const profSlice = createSlice({
  name: "prof",
  initialState: {
    cours: [],
    profile: {},
    profs: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfs.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          profs: action.payload,
        };
      })
      .addCase(getProfs.rejected, (state, action) => {
        console.log(action);
      });
  },
});
export default profSlice.reducer;
