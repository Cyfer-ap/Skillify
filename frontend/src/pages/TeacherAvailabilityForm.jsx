import { useState } from "react";
import axios from "axios";

const TeacherAvailabilityForm = () => {
  const [form, setForm] = useState({
    date: "",
    start_time: "",
    end_time: ""
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("access");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Ensure time is in HH:MM:SS format
    const payload = {
      ...form,
      start_time: form.start_time.length === 5 ? form.start_time + ":00" : form.start_time,
      end_time: form.end_time.length === 5 ? form.end_time + ":00" : form.end_time
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/availability/create/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Success:", response.data);
      setMessage("✅ Slot added!");
      setForm({ date: "", start_time: "", end_time: "" });
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data || err.message);
      console.error("Error:", detail);
      setMessage(`❌ Failed: ${detail}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Available Slot</h2>
      {message && <p className="mb-2 text-sm text-red-700">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">End Time</label>
          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default TeacherAvailabilityForm;
