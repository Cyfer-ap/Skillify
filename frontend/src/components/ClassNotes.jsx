import React from "react";

const notes = [
  {
    id: 1,
    title: "Math - Algebra Basics",
    date: "2025-06-20",
    noteUrl: "#", // Replace with actual file URL
    recordingUrl: "#", // Replace with actual video URL
  },
  {
    id: 2,
    title: "English - Essay Writing",
    date: "2025-06-18",
    noteUrl: "#",
    recordingUrl: "#",
  },
];

const ClassNotes = () => (
  <div className="class-notes-section">
    <h2 className="class-notes-title">Class Notes & Recordings</h2>
    <ul className="class-notes-list">
      {notes.map((item) => (
        <li className="class-notes-card" key={item.id}>
          <div className="class-notes-info">
            <div className="class-notes-title-main">{item.title}</div>
            <div className="class-notes-date">{item.date}</div>
          </div>
          <div className="class-notes-actions">
            <a
              href={item.noteUrl}
              className="class-notes-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Notes
            </a>
            <a
              href={item.recordingUrl}
              className="class-recording-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎥 Watch Recording
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ClassNotes;
