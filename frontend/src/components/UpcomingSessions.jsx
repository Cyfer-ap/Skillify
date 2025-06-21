import React from "react";

const sessions = [
  {
    id: 1,
    tutor: "Alice Smith",
    subject: "Math",
    date: "2025-06-25",
    time: "10:00 AM",
    status: "Booked",
  },
  {
    id: 2,
    tutor: "Bob Johnson",
    subject: "English",
    date: "2025-06-28",
    time: "2:00 PM",
    status: "Available",
  },
];

const UpcomingSessions = () => (
  <div
    style={{
      border: "1px solid red",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "lightyellow",
      margin: "10px",

      display: "block",
      overflowY: "auto", // Enable vertical scrolling
      overflowX: "hidden",
    }}
  >
    <h2 className="font-bold text-lg mb-2">Upcoming Sessions</h2>
    <ul className="space-y-2">
      {sessions.map((session) => (
        <li
          key={session.id}
          className="border rounded-lg p-4 bg-blue-50 flex flex-col md:flex-row md:items-center md:justify-between  "
        >
          <div
            style={{
              border: "1px solid red",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "lightyellow",
              margin: "10px",
              width: " 400px",
              display: "inline-block",
              overflowY: "auto", // Enable vertical scrolling
              overflowX: "hidden",
            }}
          >
            <div className="font-semibold">
              {session.subject} with {session.tutor}
            </div>
            <div className="text-gray-600">
              {session.date} at {session.time}
            </div>
          </div>
          <div>
            {session.status === "Available" ? (
              <button className="mt-2 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Book Now
              </button>
            ) : (
              <span className="text-green-600 font-semibold">Booked</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingSessions;
