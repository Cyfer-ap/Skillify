import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import Profile from "../pages/Profile";
import TeacherProfile from "../pages/TeacherProfile"; // ✅ NEW
import BrowseTeachers from "../pages/BrowseTeachers";
import BookSessionForm from "../pages/BookSessionForm";
import MyBookings from "../pages/MyBookings";
import TeacherAvailabilityForm from "../pages/TeacherAvailabilityForm";
import TeacherSlotsDashboard from "../pages/TeacherSlotsDashboard.jsx";
import StudentSlotBrowser from "../pages/StudentSlotBrowser.jsx";
import AllTeachersSlotBrowser from "../pages/AllTeachersSlotBrowser.jsx";
import TeacherSessions from "../pages/TeacherSessions";
import Notifications from "../pages/Notifications.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ✅ Student routes
      { path: "student/dashboard", element: <StudentDashboard /> },
      { path: "student/profile", element: <Profile /> }, // Student-only
      { path: "student/teachers", element: <BrowseTeachers /> },
      { path: "book/:teacherId", element: <BookSessionForm /> },
      { path: "student/bookings", element: <MyBookings /> },

      // ✅ Teacher routes
      { path: "teacher/dashboard", element: <TeacherDashboard /> },
      { path: "teacher/profile", element: <TeacherProfile /> }, // ✅ NEW teacher-only profile
      { path: "teacher/bookings", element: <MyBookings /> },
      { path: "teacher/availability", element: <TeacherAvailabilityForm /> },
      { path: "teacher/slots", element: <TeacherSlotsDashboard /> }, // ✅ Slot Management
      { path: "/student/teacher/:teacherId/slots", element: <StudentSlotBrowser />},
      { path: "/student/slots", element: <AllTeachersSlotBrowser /> },
      { path: "/teacher/sessions", element: <TeacherSessions />},
      { path: "/notifications", element: <Notifications /> },

        
    ],
  },
]);

export default router;
