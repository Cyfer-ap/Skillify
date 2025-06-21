// src/pages/TeacherDashboard.jsx
import React from "react";
import {Link} from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📘 Teacher Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome to your teaching panel. From here, you can:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li><Link to="/teacher/profile" className="btn btn-primary">👤 Profile</Link></li>
            <li><Link to="/teacher/bookings" className="btn btn-primary" >My Teaching Sessions</Link></li>
            <li><Link to="/teacher/availability" className="btn btn-primary">
              ➕ Create Availability Slot
            </Link></li>
            <li>📅 Manage your tutoring schedule</li>
            <li>💬 Join upcoming live sessions</li>
            <li>📄 Upload resources, notes, or homework</li>
            <li>🌟 Track student feedback and earnings</li>

        </ul>
    </div>
  );
};

export default TeacherDashboard;

