import { Link, Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { API } from "../config.js";
API.withCredentials = true;
import {useSelector} from "react-redux"
import { InstructorHeader } from "./instructor/header/index.jsx";

export default function ProtectedRoutes() {
  const { user, token } = useSelector((state) => state.authReducer);
console.log("SALUT")
console.log(token)
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    API.post("/logout").then(() => {
    //   setUser({});
    //   setToken(null);
    });
  };

  useEffect(() => {
    API.get("/me").then(({ data }) => {
    //   setUser(data);
      console.log("MIAOU");
    });
  }, []);

  return <Outlet />;
}
