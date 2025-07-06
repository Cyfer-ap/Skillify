import React from "react";
import "../pages/StudentDashboard.css";

const FeedbackAndEarnings = () => {
  // Replace with actual data fetching and logic as needed
  return (
    <div
      style={{
        margin: "10px 0",
        padding: "16px",
        background: "#fef9c3",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(251,191,36,0.08)",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <h3 className="tutor-feedback-title">Tutor Feedback</h3>
      <p style={{ color: "#92400e" }}>No feedback or earnings data yet.</p>
      {/* Add feedback list and earnings summary here */}
    </div>
  );
};

export default FeedbackAndEarnings;
