import React from "react";
import PropTypes from "prop-types";
import { useStateContext } from "../context/ContextProvider";
// import Navigate
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../config";
const RestrictedRoutes = ({ roles }) => {
  const { token, user, setUser } = useStateContext();
  console.log(user);
  if (!token) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get("/me");
        const userData = response.data.data;
        setUser(userData);
        console.log(userData)
      } catch (error) {
        // Gérer les erreurs ici
      }
    };

    fetchUserData();
  }, [setUser]);
  if (roles && !roles.includes(user?.role)) { 
    console.log(user)

    // Si l'utilisateur n'a pas le rôle requis, redirigez-le vers une page non autorisée ou une page par défaut
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
  // COMPLETE OU MODIFIE CE CODE

  //   return <Outlet />;
};

RestrictedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestrictedRoutes;
