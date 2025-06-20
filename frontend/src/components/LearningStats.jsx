import React from "react";

const stats = {
  sessionsAttended: 8,
  subjectsLearned: 3,
  totalTutors: 2,
};

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

const LearningStats = () => (
  <div
    style={{
      border: "1px solid red",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "lightyellow",
      margin: "10px",
      textAlign: "center",
      overflowY: "auto", // Enable vertical scrolling
      overflowX: "hidden",
    }}
  >
    <h2 className="font-bold text-lg mb-2">Your Learning Stats</h2>
    <div className="flex gap-8 mb-4">
      <div
        style={{
          border: "10x",
          display: "inline-block",
          margin: "20px",
          borderWidth: "10x",
          padding: "20px",
          backgroundColor: "lightblue",
        }}
      >
        <div>{stats.sessionsAttended}</div>
        <div className="text-gray-700">Sessions Attended</div>
      </div>
      <div
        style={{
          border: "1px",
          display: "inline-block",
          margin: "20px",
          bordewidth: "10px",
          padding: "20px",
          backgroundColor: "lightgreen",
        }}
      >
        <div className="text-2xl font-bold">{stats.subjectsLearned}</div>
        <div className="text-gray-700">Subjects Learned</div>
      </div>
      <div
        style={{
          border: "1px",
          display: "inline-block",
          margin: "20px",
          bordewidth: "10px",
          padding: "20px",
          backgroundColor: "lightcoral",
        }}
      >
        <div className="text-2xl font-bold">{stats.totalTutors}</div>
        <div className="text-gray-700">Tutors Connected</div>
      </div>
    </div>
    <h3 className="font-semibold mb-2">Feedback from Tutors</h3>
    <ul
      style={{
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "lightblue",
        margin: "10px",
        listStyleType: "none",
        color: "black",
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      {feedback.map((item) => (
        <li
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "lightyellow",
            margin: "10px",
            listStyleType: "none",
            color: "black",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <div className="font-bold">{item.tutor}</div>
          <div className="text-gray-600 text-sm">{item.date}</div>
          <div>{item.comment}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default LearningStats;
