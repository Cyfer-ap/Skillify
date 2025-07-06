import { useEffect, useState } from "react";
import { fetchMyBookings, updateSessionStatus } from "../api/api";
import dayjs from "dayjs";

const MyBookings = () => {
  const [sessions, setSessions] = useState([]);

  const token = localStorage.getItem("access");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userRole = payload?.role;

  useEffect(() => {
    fetchMyBookings()
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this session?");
    if (!confirm) return;

    try {
      await updateSessionStatus(id, "cancelled");
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: "cancelled" } : s))
      );
      alert("✅ Session cancelled");
    } catch (err) {
      console.error("Failed to cancel:", err);
      alert("❌ Could not cancel session");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s) => (
            <li key={s.id} className="border p-4 rounded shadow bg-white">
              <p><strong>With:</strong> {userRole === "student" ? s.teacher_name : s.student_name}</p>
              <p><strong>When:</strong> {s.date} | {dayjs(`2000-01-01T${s.start_time}`).format("hh:mm A")} - {dayjs(`2000-01-01T${s.end_time}`).format("hh:mm A")}</p>
              <p><strong>Status:</strong> <span className="capitalize">{s.status}</span></p>
              <p><strong>Topic:</strong> {s.topic || "N/A"}</p>
              {/* Placeholder if we extend later */}
              {/* <p><strong>Amount:</strong> ₹xxx</p>
              <p><strong>Platform:</strong> Zoom</p> */}
              {userRole === "student" && s.status !== "cancelled" && (
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

export default MyBookings;
