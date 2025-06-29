import { useEffect, useState } from "react";
import axios from "axios";

const TeacherAvailabilityForm = () => {
  const [form, setForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
    platform: "",
    subject_ids: [],
    session_type: "1v1",
    max_students: "",
    repeat_option: "",
    notes: "",
    language: "",
    grade_level: "",
    rate_type: "per_booking",
    rate: "",
    cancellation_policy: "",
    materials_provided: false,
    booking_deadline_minutes: "",
    tags: "",
    prerequisites: ""
  });

  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bookings/subjects/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error("❌ Failed to load subjects", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubjectSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setForm({ ...form, subject_ids: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      start_time: form.start_time.length === 5 ? form.start_time + ":00" : form.start_time,
      end_time: form.end_time.length === 5 ? form.end_time + ":00" : form.end_time,
      max_students: form.session_type === "group" ? parseInt(form.max_students || 0) : null,
      tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/bookings/availability/create/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log("✅ Success:", res.data);
      setMessage("✅ Slot added!");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMessage("❌ Failed: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">🧑‍🏫 Add Teaching Slot</h2>
      {message && <p className="mb-2 text-sm text-red-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <label>Date:</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2" required />

          <label>Start Time:</label>
          <input type="time" name="start_time" value={form.start_time} onChange={handleChange} className="border p-2" required />

          <label>End Time:</label>
          <input type="time" name="end_time" value={form.end_time} onChange={handleChange} className="border p-2" required />

          <label>Platform:</label>
          <select name="platform" value={form.platform} onChange={handleChange} className="border p-2">
            <option value="">-- Select --</option>
            <option>Zoom</option>
            <option>Google Meet</option>
            <option>MS Teams</option>
          </select>

          <label>Subjects (multi-select):</label>
          <select
            name="subject_ids"
            multiple
            value={form.subject_ids}
            onChange={handleSubjectSelect}
            className="border p-2"
          >
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>{subj.name}</option>
            ))}
          </select>

          <label>Session Type:</label>
          <select name="session_type" value={form.session_type} onChange={handleChange} className="border p-2">
            <option value="1v1">1-on-1</option>
            <option value="group">Group</option>
          </select>

          {form.session_type === "group" && (
            <>
              <label>Max Students:</label>
              <input type="number" name="max_students" value={form.max_students} onChange={handleChange} className="border p-2" />
            </>
          )}

          <label>Repeat Option:</label>
          <input type="text" name="repeat_option" value={form.repeat_option} onChange={handleChange} className="border p-2" placeholder="e.g., Daily or Mon,Wed" />

          <label>Language:</label>
          <input type="text" name="language" value={form.language} onChange={handleChange} className="border p-2" placeholder="e.g., English" />

          <label>Grade Level:</label>
          <select name="grade_level" value={form.grade_level} onChange={handleChange} className="border p-2">
            <option value="">-- Optional --</option>
            <option value="1-5">Grade 1–5</option>
            <option value="6-10">Grade 6–10</option>
            <option value="11-12">Grade 11–12</option>
            <option value="UG">Undergraduate</option>
            <option value="PG">Postgraduate</option>
          </select>

          <label>Rate Type:</label>
          <select name="rate_type" value={form.rate_type} onChange={handleChange} className="border p-2">
            <option value="per_booking">Per Booking</option>
            <option value="per_hour">Per Hour</option>
            <option value="fixed">Fixed</option>
          </select>

          <label>Rate:</label>
          <input type="number" name="rate" value={form.rate} onChange={handleChange} className="border p-2" placeholder="e.g., 500" />

          <label>Cancellation Policy:</label>
          <input type="text" name="cancellation_policy" value={form.cancellation_policy} onChange={handleChange} className="border p-2" placeholder="e.g., 24hr notice" />

          <label>Materials Provided:</label>
          <input type="checkbox" name="materials_provided" checked={form.materials_provided} onChange={handleChange} />

          <label>Booking Deadline (minutes):</label>
          <input type="number" name="booking_deadline_minutes" value={form.booking_deadline_minutes} onChange={handleChange} className="border p-2" />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Tags (comma-separated):</label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block font-medium">Prerequisites:</label>
          <textarea name="prerequisites" value={form.prerequisites} onChange={handleChange} className="border p-2 w-full" rows={3} />
        </div>

        <div>
          <label className="block font-medium">Additional Notes:</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="border p-2 w-full" rows={3} />
        </div>

        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full">
          ➕ Add Slot
        </button>
      </form>
    </div>
  );
};

export default TeacherAvailabilityForm;
