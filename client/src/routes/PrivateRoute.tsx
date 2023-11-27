import { useIsAuthenticated } from "react-auth-kit";
import { Register } from "../features/Register";
import { Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? <Outlet /> : <Register />;
}

export default PrivateRoute;
