import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
export const getBlogs = createAsyncThunk(
  "blogs",
  async (page, { rejectWithValue }) => {
    try {
      const response = await API.get(`/articles?page=${page}`);
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
export const getBlogsCategories = createAsyncThunk(
  "blogsCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/articleCategories");
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
export const getBlog = createAsyncThunk(
  "blog",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await API.get(`/articles/${slug}`);
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
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: false,
    status: "idle",
    index: 1,
    meta: null,
    categories: [],
  },
  reducers: {
    incrementIndex: (state) => {
      state.index = state.index + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          blogs:
            state.index == 1
              ? action.payload.data
              : [...state.blogs, ...action.payload.data],
          meta: action.payload.meta,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getBlogs.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          blog: action.payload.data,
        };
      })
      .addCase(getBlog.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      })
      .addCase(getBlogsCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogsCategories.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          categories: action.payload.data,
        };
      })
      .addCase(getBlogsCategories.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export const { incrementIndex } = blogSlice.actions;
export default blogSlice.reducer;
