import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
export const profCours = createAsyncThunk(
  "profCours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/prof-courses/3");
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

const profSlice = createSlice({
  name: "prof",
  initialState: {
    profile: {},
    cours: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profCours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profCours.fulfilled, (state, action) => {
      console.log(action);
      return {
        ...state,
        loading: false,
        cours: action.payload,
      };
    });
    builder.addCase(profCours.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = true;
    });
  },
});

export default profSlice.reducer;
