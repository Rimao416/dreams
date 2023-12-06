import { Link, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { API } from "../config.js";
import PropTypes from 'prop-types';
API.withCredentials = true;
import {useNavigate} from "react-router-dom"

export default function RestrictedRoutes({roles}) {
  const navigate=useNavigate()
  const { user, token, setUser, setToken, notification, } = useStateContext();
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
  const hasAccess = roles ? roles.includes(user.role) : true;

  if (!hasAccess) {
    toast.error("Accès non autorisé");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

RestrictedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};