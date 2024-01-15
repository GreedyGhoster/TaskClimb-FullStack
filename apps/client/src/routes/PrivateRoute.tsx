import { useIsAuthenticated } from "react-auth-kit";
import { Outlet } from "react-router-dom";
import { Register } from "../features/Register";

function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated()();

  return isAuthenticated ? <Outlet /> : <Register />;
}

export default PrivateRoute;
