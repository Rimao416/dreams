import { combineReducers } from "redux";
import profReducer from "./profSlice";
import coursReducer from "./coursSlice";
import authReducer from "./authSlice";
import blogReducer from "./blogSlice"
import categoryReducer from "./categorySlice"

import { configureStore } from "@reduxjs/toolkit";

// import academicYearReducer from "./academicYearReducer";
export const store = configureStore({
    reducer:{

        profReducer,
        coursReducer,
        authReducer,
        blogReducer,
        categoryReducer
    }
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })
