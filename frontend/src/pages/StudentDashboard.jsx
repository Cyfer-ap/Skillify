// src/pages/StudentDashboard.jsx
import React from "react";
import TutorsList from "../components/TutorsList";
import UpcomingSessions from "../components/UpcomingSessions";
import ClassNotes from "../components/ClassNotes";
import LearningStats from "../components/LearningStats";
const StudentDashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "20px",
        borderRadius: "8px",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        🎓 Student Dashboard
      </h1>
      <p className="text-gray-700 mb-6">
        Welcome to your personalized student panel. From here, you can:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
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
