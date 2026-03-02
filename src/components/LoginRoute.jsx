import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import LoginSignUp from "./LoginSignUp";

const LoginRoute = () => {
  const token = getToken();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <LoginSignUp />;
};

export default LoginRoute;
