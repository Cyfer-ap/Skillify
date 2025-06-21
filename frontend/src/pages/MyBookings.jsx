import { useEffect, useState } from "react";
import { fetchMyBookings } from "../api/api";
import dayjs from "dayjs";

const MyBookings = () => {
  const [sessions, setSessions] = useState([]);

  // Get user role from JWT
  const token = localStorage.getItem("access");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userRole = payload?.role;

  useEffect(() => {
    fetchMyBookings()
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s) => (
            <li key={s.id} className="border p-4 rounded shadow">
              <p><strong>With:</strong> {userRole === "student" ? s.teacher_name : s.student_name}</p>
              <p><strong>When:</strong> {s.date} | {dayjs(`2000-01-01T${s.start_time}`).format("hh:mm A")} - {dayjs(`2000-01-01T${s.end_time}`).format("hh:mm A")}</p>
              <p><strong>Status:</strong> {s.status}</p>
              <p><strong>Topic:</strong> {s.topic || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
