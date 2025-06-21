import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import Profile from "../pages/Profile";
import BrowseTeachers from "../pages/BrowseTeachers";
import BookSessionForm from "../pages/BookSessionForm";
import MyBookings from "../pages/MyBookings";
import TeacherAvailabilityForm from "../pages/TeacherAvailabilityForm";  // ✅ NEW IMPORT

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Student routes
      { path: "student/dashboard", element: <StudentDashboard /> },
      { path: "student/profile", element: <Profile /> },
      { path: "student/teachers", element: <BrowseTeachers /> },
      { path: "book/:teacherId", element: <BookSessionForm /> },
      { path: "student/bookings", element: <MyBookings /> },

      // Teacher routes
      { path: "teacher/dashboard", element: <TeacherDashboard /> },
      { path: "teacher/profile", element: <Profile /> },
      { path: "teacher/bookings", element: <MyBookings /> },
      { path: "teacher/availability", element: <TeacherAvailabilityForm /> },  // ✅ NEW ROUTE
    ]
  }
]);

export default router;
