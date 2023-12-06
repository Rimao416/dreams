import React from "react";
import PropTypes from "prop-types";
import { useStateContext } from "../context/ContextProvider";
// import Navigate
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../config";
import authApi from "../services/authApi";
const RestrictedRoutes = ({ roles }) => {
  const role = authApi.getUserInfo();

  console.log(role);

  return <Outlet />;
  // COMPLETE OU MODIFIE CE CODE

  //   return <Outlet />;
};

RestrictedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestrictedRoutes;
