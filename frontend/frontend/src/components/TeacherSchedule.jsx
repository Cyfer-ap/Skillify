import React from "react";

const TeacherSchedule = () => {
  // Replace with actual schedule logic/fetching
  return (
    <div
      style={{
        margin: "10px",
        padding: "16px",
        background: "#f1f5f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "800px",
        height: "300px",
      }}
    >
      <h3 style={{ fontWeight: "bold", color: "#2563eb" }}>
        Your Tutoring Schedule
      </h3>
      <p style={{ color: "#374151" }}>No sessions scheduled yet.</p>
      {/* Add calendar, session list, or schedule management UI here */}
    </div>
  );
};

export default TeacherSchedule;
