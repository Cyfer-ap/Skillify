import { Link } from "react-router-dom";
import TeacherSchedule from "../components/TeacherSchedule";
import UpcomingLiveSessions from "../components/UpcomingLiveSessions";
import UploadResources from "../components/UploadResources";
import FeedbackAndEarnings from "../components/FeedbackAndEarnings";

const TeacherDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📘 Teacher Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome to your teaching panel. From here, you can:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>
          <Link
            to="/teacher/profile"
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            👤 Profile
          </Link>
        </li>
        <li>
          <Link
            to="/teacher/bookings"
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            My Teaching Sessions
          </Link>
        </li>
        <li>
          <Link to="/teacher/slots" className="text-blue-600 underline">
          📅 View My Slots
        </Link>
        </li>
        <li>
          <Link
            to="/teacher/availability"
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            ➕ Create Availability Slot
          </Link>
        </li>
        <li>
          <Link to="/teacher/sessions" className="text-blue-600 underline">
            📅 View My Bookings
          </Link>
        </li>
        <li>
          📅 Manage your tutoring schedule
          <TeacherSchedule />
        </li>
        <li>
          💬 Join upcoming live sessions
          <UpcomingLiveSessions />
        </li>
        <li>
          📄 Upload resources, notes, or homework
          <UploadResources />
        </li>
        <li>
          🌟 Track student feedback and earnings
          <FeedbackAndEarnings />
        </li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;
