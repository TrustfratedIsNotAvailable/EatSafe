import React from "react";
import { Navigate, useLocation } from "react-router";
import Spinner from "../components/shared/Spinner";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    //redirect to login page and save intended route
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
