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
export const addCours = createAsyncThunk(
  "addCours/prof",
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.post(`/courses`, data);
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
export const course_progression = createAsyncThunk(
  "course_progression",
  async (slug, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/course-progression/${slug}`);
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

export const updateCours = createAsyncThunk(
  "updateCours",
  async (data, { rejectWithValue }) => {
    // if(typeof )
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const url =
        data instanceof FormData
          ? `/modifier-courses/${data.get("id")}`
          : `/modifier-courses/${data.id}`;

      const response = await API.post(url, data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const startCours = createAsyncThunk(
  "startCours",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.post(`/startCourse`, data);
      console.log(response);
      return data.course_id;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCours = createAsyncThunk(
  "deleteCours",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.delete(`/courses/${id}`);
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

export const getCours = createAsyncThunk(
  "getCours",
  async (page, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/courses?page=${page}`);
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

export const getCour = createAsyncThunk(
  "getCour",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get(`/courses/${id}`);
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
    index: 1,
    meta: null,
    progression: 0,
  },
  reducers: {
    increment: (state) => {
      state.index += 1;
    },
  },
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
          cours: action.payload.data,
        };
      })
      .addCase(profCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(addCours.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCours.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(addCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getCours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCours.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          cours: action.payload.data,
          meta: action.payload.meta,
        };
      })
      .addCase(getCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getCour.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCour.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          cours: [action.payload.data],
        };
      })
      .addCase(getCour.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCours.pending, (state, action) => {
        console.log(action);
        state.loading = true;
      })
      .addCase(deleteCours.fulfilled, (state, action) => {
        const updateCours = state.cours.filter(
          (cours) => cours.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          cours: updateCours,
        };
      })
      .addCase(deleteCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(updateCours.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCours.fulfilled, (state, action) => {
        console.log(action);
        const updateCour = action.payload.data;
        const updateCours = state.cours.map((cour) =>
          cour.id === updateCour.id ? updateCour : cour
        );
        return {
          ...state,
          loading: false,
          cours: updateCours,
        };
      })
      .addCase(updateCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(startCours.pending, (state) => {
        state.loading = true;
      })
      .addCase(startCours.fulfilled, (state, action) => {
        console.log(action);
        const updateCour = action.payload;
        const updateCours = state.cours.map((cour) =>
          cour.id === updateCour.id ? updateCour : cour
        );
        return {
          ...state,
          loading: false,
          cours: updateCours,
        };
      })
      .addCase(startCours.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(course_progression.pending, (state) => {
        state.loading = true;
      })
      .addCase(course_progression.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          progression: action.payload.data,
        };
      })
      .addCase(course_progression.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export default coursSlice.reducer;
