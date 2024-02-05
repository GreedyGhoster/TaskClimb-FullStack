import { useIsAuthenticated } from "react-auth-kit";
import { Outlet } from "react-router-dom";
import { SignIn } from "../features/auth/SignIn";

function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated()();

  return isAuthenticated ? <Outlet /> : <SignIn />;
}

export default PrivateRoute;
