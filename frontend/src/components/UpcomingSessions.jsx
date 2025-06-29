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
  <div className="upcoming-sessions-section">
    <h2 className="upcoming-sessions-title">Upcoming Sessions</h2>
    <ul className="upcoming-sessions-list">
      {sessions.map((session) => (
        <li className="upcoming-session-card" key={session.id}>
          <div className="upcoming-session-info">
            <div className="upcoming-session-subject">{session.subject}</div>
            <div className="upcoming-session-tutor">with {session.tutor}</div>
            <div className="upcoming-session-date">{session.date} at {session.time}</div>
          </div>
          <div className="upcoming-session-action">
            {session.status === "Available" ? (
              <button className="upcoming-session-book-btn">Book Now</button>
            ) : (
              <span className="upcoming-session-booked">Booked</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingSessions;
