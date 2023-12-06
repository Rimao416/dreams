import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";

export const addLesson = createAsyncThunk(
  "addlessons",
  async (data, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.post(`/lessons`, data, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          console.log(progress);
          dispatch(setUploadProgress(progress));
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
export const setUploadProgress = (progress) => ({
  type: "lecons/setUploadProgress",
  payload: progress,
});
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
export const getCourLessonSlug = createAsyncThunk(
  "getCourLessonSlug",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/course-lessons-slug/${id}`);
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
export const updateLesson = createAsyncThunk(
  "updateLesson",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(data.get("id"));
    try {
      const url =
        data instanceof FormData
          ? `/modifier-lessons/${data.get("id")}`
          : `/modifier-lessons/${data.id}`;
      const response = await API.post(url, data);
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
export const deleteLesson = createAsyncThunk(
  "deleteLesson",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.delete(`/lessons/${id}`);
      console.log(response);
      return id;
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
    type: "",
    uploadProgress: 0,
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
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
          type: action.type,
          uploadProgress: 0,
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
          type: action.type,
        };
      })
      .addCase(getCourLesson.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        console.log(action);
        const updatedLecon = action.payload.data; // La leçon mise à jour provenant de votre backend

        // Créer un nouveau tableau de leçons en remplaçant uniquement la leçon mise à jour
        const updatedFinal = state.lecons.map((lecon) =>
          lecon.id === updatedLecon.id ? updatedLecon : lecon
        );
        return {
          ...state,
          loading: false,
          lecons: updatedFinal,
          //   COMPLETE LE CODE
          type: action.type,
          uploadProgress: 0,
        };
      })
      .addCase(updateLesson.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        // Créer un nouveau tableau de leçons en supprimant la leçon supprimé
        const updatedFinal = state.lecons.filter(
          (lecon) => lecon.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          lecons: updatedFinal,
          //   COMPLETE LE CODE
          type: action.type,
        };
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getCourLessonSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourLessonSlug.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          lecons: action.payload.data,
        };
      })
      .addCase(getCourLessonSlug.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export default leconSlice.reducer;
