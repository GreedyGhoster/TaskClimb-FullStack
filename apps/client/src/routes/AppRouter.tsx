import { NotFound } from "../features/NotFound";
import { Route, Routes } from "react-router-dom";
import { ProjectPage } from "../features/ProjectPage";
import { TaskPage } from "../features/TaskPage";
import { Greeting } from "../components/Greeting";
import { SignIn } from "../features/SignIn";
import { Register } from "../features/Register";
import PrivateRoute from "./PrivateRoute";
import { AppLayout } from "../features/layouts/AppLayout";
import { Profile } from "../features/Profile";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Greeting />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/projects/:projectId/:taskId" element={<TaskPage />} />
          <Route path="/users/me" element={<Profile />} />
        </Route>
      </Route>
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
