import { Route, Navigate } from "react-router-dom";
import { Children, useContext } from "react";
import { Context } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const { jwtToken } = useContext(Context);
  if (jwtToken === null) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
