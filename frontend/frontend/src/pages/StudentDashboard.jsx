// src/pages/StudentDashboard.jsx
import React from "react";

const StudentDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">🎓 Student Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome to your personalized student panel. From here, you can:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>📚 Browse available tutors</li>
        <li>📆 View or book upcoming sessions</li>
        <li>📝 Access class notes and session recordings</li>
        <li>⭐ Review your learning stats and feedback</li>
      </ul>
    </div>
  );
};

export default StudentDashboard;
