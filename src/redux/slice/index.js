import { combineReducers } from "redux";
import profReducer from "./profSlice";
import profsReducer from "./profsSlice";
import coursReducer from "./coursSlice";
import authReducer from "./authSlice";
import blogReducer from "./blogSlice";
import categoryReducer from "./categorySlice";
import leconReducer from "./leconSlice";
import studentReducer from "./studentSlice";

import { configureStore } from "@reduxjs/toolkit";

// import academicYearReducer from "./academicYearReducer";
export const store = configureStore({
  reducer: {
    profReducer,
    profsReducer,
    coursReducer,
    authReducer,
    blogReducer,
    categoryReducer,
    leconReducer,
    studentReducer,
  },
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })
