import { NotFound } from "../features/NotFound";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../features/layouts/AppLayout";
import { ProjectPage } from "../features/ProjectPage";
import { TaskPage } from "../features/TaskPage";
import { Greeting } from "../components/Greeting";
import { SignUp } from "../features/SignUp";
import { SignIn } from "../features/SignIn";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Greeting />} />
        <Route path=":projectId" element={<ProjectPage />} />
        <Route path=":projectId/:taskId" element={<TaskPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
