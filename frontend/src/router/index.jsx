// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import Profile from "../pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "student/dashboard", element: <StudentDashboard /> },
      { path: "teacher/dashboard", element: <TeacherDashboard /> },
      { path: "student/profile", element: <Profile /> },
      { path: "teacher/profile", element: <Profile /> },
    ]
  }
]);

export default router;
