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
export const getSingleProf = createAsyncThunk(
  "getSingleProf",
  async (pseudo, { rejectWithValue }) => {
    try {
      const response = await API.get(`/profs/${pseudo}`);
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
export const getProfReviews = createAsyncThunk(
  "getProfReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/prof-notes`);
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
export const getProfReviewsSlug = createAsyncThunk(
  "getProfReviewsSlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await API.get(`/prof-notes/${slug}`);
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
    cours: [],
    profile: {},
    profs: {},
    loading: false,
    reviews: [],
    avis: [],
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profCours.pending, (state) => {
        state.loading = true;
      })
      .addCase(profCours.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          cours: action.payload,
        };
      })
      .addCase(profCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getProfs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfs.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          profs: action.payload.data,
        };
      })
      .addCase(getProfs.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getSingleProf.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProf.fulfilled, (state, action) => {
        console.log(action);
        console.log("BONJOUR");
        const updatedProf = action.payload.data;
        console.log(updatedProf);
        return {
          ...state,
          loading: false,
          profs: {
            ...state.profs,
            [updatedProf.id]: updatedProf,
          },
        };
      })
      .addCase(getSingleProf.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getProfReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfReviews.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          reviews: action.payload.data,
        };
      })
      .addCase(getProfReviews.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getProfReviewsSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfReviewsSlug.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          reviews: action.payload.data,
        };
      })
      .addCase(getProfReviewsSlug.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export default profSlice.reducer;
