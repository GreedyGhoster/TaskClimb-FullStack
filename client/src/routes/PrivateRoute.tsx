import { Register } from "../features/Register";
import { Outlet } from "react-router-dom";
import { useTodo } from "../hooks";
import { useState, useEffect } from "react";

function PrivateRoute() {
  const { getTokenFromLocalStorage } = useTodo();
  const token = getTokenFromLocalStorage();
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return isAuth ? <Outlet /> : <Register />;
}

export default PrivateRoute;
