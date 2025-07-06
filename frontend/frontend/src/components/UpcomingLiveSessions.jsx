import React from "react";

const UpcomingLiveSessions = () => {
  // Replace with actual fetching logic if needed
  return (
    <div
      style={{
        margin: "10px 0",
        padding: "16px",
        background: "#f0fdf4",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(16, 185, 129, 0.08)",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <h3 style={{ fontWeight: "bold", color: "#059669" }}>
        Upcoming Live Sessions
      </h3>
      <p style={{ color: "#065f46" }}>No live sessions scheduled yet.</p>
      {/* Add session join buttons or list here */}
    </div>
  );
};

export default UpcomingLiveSessions;
