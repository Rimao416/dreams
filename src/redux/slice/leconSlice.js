import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const addLesson = createAsyncThunk(
  "addlessons",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.post(`/lessons`, data,{
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          console.log(progress);
        },
      });
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
export const getCourLesson = createAsyncThunk(
  "getCourLesson",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/course-lessons/${id}`);
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
// export const getCours = createAsyncThunk(
//   "getCours",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("ACCESS_TOKEN");
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     try {
//       const response = await API.get(`/courses`);
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

const leconSlice = createSlice({
  name: "lecons",
  initialState: {
    lecons: [],
    loading: false,
    error: false,
    status: "idle",
    type:""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          lecons: [...state.lecons, action.payload.data],
          type:action.type
        };
      })
      .addCase(addLesson.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getCourLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourLesson.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          lecons: action.payload.data,
          type:action.type
        };
      })
      .addCase(getCourLesson.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export default leconSlice.reducer;
