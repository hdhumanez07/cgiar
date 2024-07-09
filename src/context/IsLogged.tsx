import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { isJWT } from "../utils/jwt";

function IsLogged() {
  const { auth } = useAuth();

  if (auth && isJWT(auth.token)) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
}

export { IsLogged };
