import React from "react";

const stats = [
  {
    id: 1,
    label: "Sessions Attended",
    value: 8,
    icon: "📅",
    color: "#6366f1"
  },
  {
    id: 2,
    label: "Subjects Learned",
    value: 3,
    icon: "📚",
    color: "#16a34a"
  },
  {
    id: 3,
    label: "Tutors Connected",
    value: 2,
    icon: "👩‍🏫",
    color: "#2563eb"
  },
];

const feedback = [
  {
    id: 1,
    tutor: "Alice Smith",
    comment: "Great progress in Math! Keep practicing.",
    date: "2025-06-20",
  },
  {
    id: 2,
    tutor: "Bob Johnson",
    comment: "Excellent participation in English sessions.",
    date: "2025-06-18",
  },
];

const avatarColors = ["#6366f1", "#16a34a", "#2563eb", "#f59e42", "#e11d48"];

const LearningStats = () => (
  <div className="learning-stats-section-pro">
    <h2 className="learning-stats-title-pro">Your Learning Stats</h2>
    <div className="learning-stats-cards-pro">
      {stats.map((stat) => (
        <div className="learning-stat-card-pro" key={stat.id}>
          <div className="learning-stat-icon-pro" style={{ background: stat.color }}>{stat.icon}</div>
          <div className="learning-stat-value-pro">{stat.value}</div>
          <div className="learning-stat-label-pro">{stat.label}</div>
        </div>
      ))}
    </div>
    <h3 className="tutor-feedback-title">Tutor Feedback</h3>
    <ul className="learning-feedback-list-pro">
      {feedback.map((item, idx) => (
        <li className="learning-feedback-card-pro feedback-bubble" key={item.id}>
          <div className="feedback-header">
            <span className="learning-feedback-avatar-pro" style={{ background: avatarColors[idx % avatarColors.length] }}>
              {item.tutor.charAt(0)}
            </span>
            <div>
              <div className="learning-feedback-tutor-pro">{item.tutor}</div>
              <div className="learning-feedback-date-pro">{item.date}</div>
            </div>
          </div>
          <div className="feedback-quote">
            <span className="feedback-quote-icon">“</span>
            <span>{item.comment}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default LearningStats;
