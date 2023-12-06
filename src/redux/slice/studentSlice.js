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
export const getUsersMessage = createAsyncThunk(
  "messages/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/get-messages-users");
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
export const getUsersConversation = createAsyncThunk(
  "conversations/users",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/get-messages/${id}`);
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
export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post(`/send-message`, data);
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
    messages: [],
    conversations: [],
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
      })
      .addCase(getUsersMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersMessage.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          messages: action.payload.data,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getUsersMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUsersConversation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersConversation.fulfilled, (state, action) => {
        // console.log(act)

        return {
          ...state,
          loading: false,
          conversations: action.payload.data,
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(getUsersConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log(action.payload.data)

        return {
          ...state,
          loading: false,
          conversations: [...state.conversations, action.payload.data],
          //   blogs: page==1 ? action.payload.data : [...state.blogs, ...action.payload.data],
        };
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default studentSlice.reducer;
