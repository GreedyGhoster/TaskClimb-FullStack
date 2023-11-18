import { Register } from "../features/Register";
import { Outlet } from "react-router-dom";
import { useTodo } from "../hooks";
import { useState, useEffect } from "react";

function PrivateRoute() {
  const { token } = useTodo();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return isAuth ? <Outlet /> : <Register />;
}

export default PrivateRoute;
