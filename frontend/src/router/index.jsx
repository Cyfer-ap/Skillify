import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <App />,
    children: [{ index: true, element: <Login /> }]
  },
  {
    path: "/register",
    element: <App />,
    children: [{ index: true, element: <Register /> }]
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />
  },
  {
    path: "/teacher/dashboard",
    element: <TeacherDashboard />
  },
]);

export default router;
