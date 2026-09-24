import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.jsx";

const PublicRoute = ({ children }) => {
  const { jwtToken } = useContext(Context);

  // User is already logged in
  if (jwtToken) {
    return <Navigate to="/main-home" replace />;
  }

  // User is not logged in
  return children;
};

export default PublicRoute;
