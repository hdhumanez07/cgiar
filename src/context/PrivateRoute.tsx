import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { isJWT } from "../utils/jwt";

function PrivateRoute() {
  const { auth } = useAuth();

  if (auth && isJWT(auth.token)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export { PrivateRoute };
