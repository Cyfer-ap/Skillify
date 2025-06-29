import { useEffect, useState } from "react";
import { fetchMyAvailability } from "../api/api";

const TeacherSlotsDashboard = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchMyAvailability()
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("❌ Failed to fetch slots:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📅 My Teaching Slots</h2>

      {slots.length === 0 ? (
        <p>No slots created yet.</p>
      ) : (
        <ul className="space-y-4">
          {slots.map((slot) => (
            <li
              key={slot.id}
              className="border rounded p-4 shadow bg-white flex flex-col gap-1"
            >
              <p><strong>Date:</strong> {slot.date}</p>
              <p><strong>Time:</strong> {slot.start_time} - {slot.end_time}</p>
              <p><strong>Platform:</strong> {slot.platform || "N/A"}</p>
              <p><strong>Subject:</strong> {slot.subject || "N/A"}</p>
              <p><strong>Language:</strong> {slot.language || "N/A"}</p>
              <p><strong>Session Type:</strong> {slot.session_type}</p>
              <p><strong>Rate:</strong> ₹{slot.rate} ({slot.rate_type})</p>
              <p><strong>Materials Provided:</strong> {slot.materials_provided ? "Yes" : "No"}</p>
              <p><strong>Tags:</strong> {slot.tags?.join(", ") || "None"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherSlotsDashboard;
