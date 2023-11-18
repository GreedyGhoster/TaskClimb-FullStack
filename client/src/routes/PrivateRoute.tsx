import { Register } from "../features/Register";
import { Outlet } from "react-router-dom";
import { useTodo } from "../hooks";
import { useState, useEffect } from "react";

function PrivateRoute() {
  const { getTokenFromLocalStorage } = useTodo();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [getTokenFromLocalStorage()]);

  return isAuth ? <Outlet /> : <Register />;
}

export default PrivateRoute;
