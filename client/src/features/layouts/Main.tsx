import { Outlet } from "react-router-dom";
import { UseTodoProvider, UseAuthProvider, UseUserProvider } from "../../hooks";

export default function Main() {
  return (
    <div>
      <UseAuthProvider>
        <UseTodoProvider>
          <UseUserProvider>
            <Outlet />
          </UseUserProvider>
        </UseTodoProvider>
      </UseAuthProvider>
    </div>
  );
}
