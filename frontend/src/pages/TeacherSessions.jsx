import { useEffect, useState } from "react";
import { fetchTeacherSessions, updateSessionStatus } from "../api/api";

const TeacherSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchTeacherSessions()
      .then(res => setSessions(res.data))
      .catch(err => console.error("Error fetching sessions", err));
  }, []);

  const handleConfirm = async (id) => {
    try {
      await updateSessionStatus(id, "confirmed");
      alert("✅ Session confirmed");
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: "confirmed" } : s))
      );
    } catch (err) {
      console.error("Failed to confirm session:", err);
    }
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this session?");
    if (!confirm) return;

    try {
      await updateSessionStatus(id, "cancelled");
      alert("❌ Session cancelled");
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: "cancelled" } : s))
      );
    } catch (err) {
      console.error("Failed to cancel session:", err);
      alert("❌ Could not cancel session");
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📚 My Tutoring Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map(s => (
            <li key={s.id} className="bg-white p-4 rounded shadow">
              <p><strong>Student:</strong> {s.student_name}</p>
              <p><strong>Date:</strong> {s.date}</p>
              <p><strong>Time:</strong> {s.start_time} - {s.end_time}</p>
              <p><strong>Topic:</strong> {s.topic || "N/A"}</p>
              <p><strong>Status:</strong> <span className="capitalize">{s.status}</span></p>

              {s.status === "pending" && (
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => handleConfirm(s.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    ✅ Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(s.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}

              {s.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(s.id)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ❌ Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherSessions;
