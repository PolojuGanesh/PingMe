import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const { jwtToken } = useContext(Context);

  // User is not logged in
  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
};

export default ProtectedRoute;
