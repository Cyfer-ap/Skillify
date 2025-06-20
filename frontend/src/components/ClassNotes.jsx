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
  <div
    style={{
      margin: "10px",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "lightyellow",
    }}
  >
    <h2 className="font-bold text-lg mb-2">Class Notes & Recordings</h2>
    <ul className="space-y-2">
      {notes.map((item) => (
        <li
          key={item.id}
          className="border rounded-lg p-4 bg-green-50 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-gray-600">{item.date}</div>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a
              href={item.noteUrl}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Notes
            </a>
            <a
              href={item.recordingUrl}
              className="text-indigo-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Recording
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ClassNotes;
