import { useIsAuthenticated } from "react-auth-kit";
import { Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    window.location.replace("/auth/register")
  );
}

export default PrivateRoute;
