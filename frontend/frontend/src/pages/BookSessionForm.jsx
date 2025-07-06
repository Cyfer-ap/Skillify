import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAvailability, bookSession } from "../api/api";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const generateTimeOptions = (start, end) => {
  const options = [];
  let current = dayjs(`2000-01-01T${start}`);
  const endTime = dayjs(`2000-01-01T${end}`);

  while (current.add(30, "minute").isSameOrBefore(endTime)) {
    options.push(current.format("HH:mm"));
    current = current.add(30, "minute");
  }
  return options;
};

const BookSessionForm = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("30");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    fetchAvailability(teacherId)
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("Failed to fetch availability:", err));
  }, [teacherId]);

  const handleSlotSelect = (e) => {
    const slot = JSON.parse(e.target.value);
    setSelectedSlot(slot);
    setStartTime("");
    setDuration("30");
  };

  const handleBook = async () => {
    if (!selectedSlot || !startTime || !duration) {
      alert("Please select all booking options.");
      return;
    }

    const sessionStart = dayjs(`2000-01-01T${startTime}`);
    const sessionEnd = sessionStart.add(Number(duration), "minute");
    const slotEnd = dayjs(`2000-01-01T${selectedSlot.end_time}`);

    if (sessionEnd.isAfter(slotEnd)) {
      alert("⛔ Selected duration exceeds tutor's availability.");
      return;
    }

    const payload = {
      teacher: teacherId,
      date: selectedSlot.date,
      start_time: sessionStart.format("HH:mm:ss"),
      end_time: sessionEnd.format("HH:mm:ss"),
      topic,
    };

    try {
      await bookSession(payload);
      alert("✅ Session booked!");
      navigate("/student/bookings");
    } catch (err) {
      console.log("Booking payload:", payload);
      console.error("Booking error:", err.response?.data || err.message);
      alert("❌ Failed to book session: " + JSON.stringify(err.response?.data || {}));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Session</h2>

      <label className="block mb-2 font-medium">Select Availability Window:</label>
      <select className="w-full border p-2 mb-4" onChange={handleSlotSelect}>
        <option value="">-- Select Slot --</option>
        {slots.map((slot) => (
          <option key={slot.id} value={JSON.stringify(slot)}>
            {slot.date} | {slot.start_time} - {slot.end_time}
          </option>
        ))}
      </select>

      {selectedSlot && (
        <>
          <label className="block mb-2 font-medium">Select Start Time:</label>
          <select
            className="w-full border p-2 mb-4"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">-- Select --</option>
            {generateTimeOptions(selectedSlot.start_time, selectedSlot.end_time).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Select Duration:</label>
          <select
            className="w-full border p-2 mb-4"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="90">1.5 Hours</option>
            <option value="120">2 Hours</option>
          </select>
        </>
      )}

      <label className="block mb-2 font-medium">Topic (optional):</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border p-2 mb-4"
        placeholder="e.g., Algebra, ReactJS, Essay writing..."
      />

      <button
        onClick={handleBook}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Book Session
      </button>
    </div>
  );
};

export default BookSessionForm;
