import { NotFound } from "../features/NotFound";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../features/layouts/AppLayout";
import { ProjectPage } from "../features/ProjectPage";
import { TaskPage } from "../features/TaskPage";
import { Greeting } from "../components/Greeting";
import { SignIn } from "../features/SignIn";
import { Register } from "../features/Register";

// TODO: Сделать так, чтобы страница авторизации была начальной страницей
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Greeting />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/projects/:projectId/:taskId" element={<TaskPage />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/signin" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
