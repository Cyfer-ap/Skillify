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
      <ul className="dashboard-list">
        <li>
          <span className="icon-bubble">👤</span>
          <Link to="/student/profile">Profile</Link>
        </li>
        <li>
          <span className="icon-bubble">🧑‍🏫</span>
          <Link to="/student/teachers">Browse Tutors</Link>
        </li>
        <li>
          <span className="icon-bubble">📅</span>
          <Link to="/student/bookings">My Bookings</Link>
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
