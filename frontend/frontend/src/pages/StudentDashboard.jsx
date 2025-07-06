// src/pages/StudentDashboard.jsx
import React from "react";
import TutorsList from "../components/TutorsList";
import UpcomingSessions from "../components/UpcomingSessions";
import ClassNotes from "../components/ClassNotes";
import LearningStats from "../components/LearningStats";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <h1 className="dashboard-title text-3xl font-bold text-indigo-600 mb-4">
        🎓 Student Dashboard
      </h1>
      <p className="text-gray-700 mb-6">
        Welcome to your personalized student panel. From here, you can:
      </p>

      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>
          <Link to="/student/profile" className="text-blue-600 underline">
            👤 Profile
          </Link>
        </li>
        <li>
          <Link to="/student/teachers" className="text-blue-600 underline">
            🧑‍🏫 Browse Tutors
          </Link>
        </li>
        <li>
          <Link to="/student/bookings" className="text-green-600 underline">
            📅 My Bookings
          </Link>
        </li>
        <li>
          <Link to="/student/slots" className="text-purple-600 underline">
            📌 Book a Session (All Tutors)
          </Link>
        </li>
        <li>👩‍🏫 Connect with tutors</li>
        <TutorsList />
        <li>📆 View or book upcoming sessions</li>
        <UpcomingSessions />
        <li>📝 Access class notes and session recordings</li>
        <ClassNotes />
        <li>⭐ Review your learning stats and feedback</li>
        <LearningStats />
      </ul>
    </div>
  );
};

export default StudentDashboard;
