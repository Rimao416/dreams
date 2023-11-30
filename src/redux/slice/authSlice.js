import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const AUTH_URL = "http://localhost:5000/api/v1/users/login";
import { API } from "../../config";
// Action asynchrone pour la connexion
export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    console.log(credentials)
    const response = await API.post("/login", credentials);
    console.log(response)
    return response.data;
    // console.log(response)
    // console.log(response)
    // return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    throw error.response.data;

    // throw error.response.data;
  }
});



// Slice Redux pour gérer l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("ACCESS_TOKEN", action?.payload.access_token);
        // console.log(state.user)
        // console.log(role)

        // console.log(action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorType = action.error.message;
      });
  },
});

export default authSlice.reducer;
