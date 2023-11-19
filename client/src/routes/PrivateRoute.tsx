import { Register } from "../features/Register";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks";

function PrivateRoute() {
  const { getTokenFromLocalStorage } = useAuth();
  const token = getTokenFromLocalStorage();
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return isAuth ? <Outlet /> : <Register />;
}

export default PrivateRoute;
