import { Outlet } from "react-router-dom";
import { UseTodoProvider } from "../../hooks";

export default function Main() {
  return (
    <div>
      <UseTodoProvider>
        <Outlet />
      </UseTodoProvider>
    </div>
  );
}
