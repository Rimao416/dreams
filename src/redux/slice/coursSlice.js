import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
export const profCours = createAsyncThunk(
  "profCours",
  async (id, { rejectWithValue }) => {
    // const token = localStorage.getItem("ACCESS_TOKEN");
    // API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/prof-courses/${id}`);
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

const coursSlice = createSlice({
  name: "cours",
  initialState: {
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
        cours: action.payload.data,
      };
    });
    builder.addCase(profCours.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = true;
    })
  },
});

export default coursSlice.reducer;
