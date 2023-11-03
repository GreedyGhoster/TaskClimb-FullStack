import { NotFound } from "../features/NotFound";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../features/layouts/AppLayout";
import { ProjectPage } from "../features/ProjectPage";
import { TaskPage } from "../features/TaskPage";
import { Greeting } from "../components/Greeting";
import { SignIn } from "../features/SignIn";
import { Register } from "../features/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Greeting />} />
        <Route path=":projectId" element={<ProjectPage />} />
        <Route path=":projectId/:taskId" element={<TaskPage />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/signin" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
