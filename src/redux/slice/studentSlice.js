import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const getPaidCourses = createAsyncThunk(
  "paidCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/paidCourses");
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

export const getHistory = createAsyncThunk(
  "history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/history");
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
export const getStudentPaiement = createAsyncThunk(
  "paiement",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/userPayments");
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
// export const getBlogs = createAsyncThunk(
//   "blogs",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/articles");
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const studentSlice = createSlice({
  name: "students",
  initialState: {
    cours: [],
    payments: [],
    loading: false,
    error: false,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaidCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaidCourses.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          cours: action.payload.data,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getPaidCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          payments: action.payload.data,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getStudentPaiement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentPaiement.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          payments: action.payload.data,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getStudentPaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default studentSlice.reducer;
