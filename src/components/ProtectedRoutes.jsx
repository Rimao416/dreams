import { Link, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { API } from "../config.js";
API.withCredentials = true;

export default function ProtectedRoutes() {
  const { user, token, setUser, setToken, notification } = useStateContext();
  console.log(user);
  if (!token) {
    toast.error("Veuillez vous connecter");
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    API.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    API.get("/me").then(({ data }) => {
      setUser(data.data);
    });
  }, []);

  return <Outlet />;
}
