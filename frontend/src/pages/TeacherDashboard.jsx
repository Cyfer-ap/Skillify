// src/pages/TeacherDashboard.jsx
import React from "react";

const TeacherDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📘 Teacher Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome to your teaching panel. From here, you can:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>📅 Manage your tutoring schedule</li>
        <li>💬 Join upcoming live sessions</li>
        <li>📄 Upload resources, notes, or homework</li>
        <li>🌟 Track student feedback and earnings</li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;

