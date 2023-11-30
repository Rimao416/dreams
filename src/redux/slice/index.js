import { combineReducers } from "redux";
import profReducer from "./profSlice";
import coursReducer from "./coursSlice";
import authReducer from "./authSlice";
// import { configureStore } from "@reduxjs/toolkit";

// import academicYearReducer from "./academicYearReducer";
export const reducers = combineReducers({
  profReducer,
  coursReducer,
  authReducer,
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })
