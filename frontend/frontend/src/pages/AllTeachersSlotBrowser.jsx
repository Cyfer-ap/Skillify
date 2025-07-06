import { useEffect, useState } from "react";
import {
  fetchAllAvailableSlots,
  bookSession,
  fetchTeachers,
  fetchMyBookings,
} from "../api/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const generateTimeBlocks = (start, end, interval = 30) => {
  const result = [];
  let current = dayjs(`2000-01-01T${start}`);
  const endTime = dayjs(`2000-01-01T${end}`);
  while (
    current.add(interval, "minute").isBefore(endTime) ||
    current.add(interval, "minute").isSame(endTime)
  ) {
    const next = current.add(interval, "minute");
    result.push({
      start: current.format("HH:mm"),
      end: next.format("HH:mm"),
    });
    current = next;
  }
  return result;
};

const StudentSlotBrowser = () => {
  const [slots, setSlots] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [topic, setTopic] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [teachersRes, availabilityRes, bookingsRes] = await Promise.all([
          fetchTeachers(),
          fetchAllAvailableSlots(),
          fetchMyBookings(),
        ]);

        const teacherMap = {};
        teachersRes.data.forEach((t) => {
          teacherMap[t.id] = t;
        });

        const uniqueMap = {};
        availabilityRes.data.forEach((s) => {
          const key = `${s.teacher}_${s.date}_${s.start_time}_${s.end_time}`;
          uniqueMap[key] = s;
        });

        setTeachers(teacherMap);
        setSlots(Object.values(uniqueMap));
        setAllBookings(bookingsRes.data);
      } catch (err) {
        console.error("Loading error:", err);
      }
    };
    loadAllData();
  }, []);

  const toggleBlock = (slotId, block) => {
    const slot = slots.find((s) => s.id === slotId);
    const teacherId = slot.teacher;

    if (selectedBlocks.length > 0) {
      const currentTeacher = slots.find((s) => s.id === selectedBlocks[0].slotId)?.teacher;
      if (teacherId !== currentTeacher) {
        return alert("❌ Book from only one teacher at a time.");
      }
    }

    const key = `${slotId}_${block.start}`;
    const exists = selectedBlocks.find((b) => b.key === key);
    if (exists) {
      setSelectedBlocks((prev) => prev.filter((b) => b.key !== key));
    } else {
      setSelectedBlocks((prev) => [
        ...prev,
        {
          key,
          slotId,
          start: block.start,
          end: block.end,
        },
      ]);
    }
  };

  const isBlockSelected = (slotId, start) =>
    selectedBlocks.some((b) => b.slotId === slotId && b.start === start);

  const getBlockStatus = (date, startTime, endTime) => {
    const match = allBookings.find(
      (b) =>
        b.date === date &&
        dayjs(`2000-01-01T${b.start_time}`).isBefore(dayjs(`2000-01-01T${endTime}`)) &&
        dayjs(`2000-01-01T${b.end_time}`).isAfter(dayjs(`2000-01-01T${startTime}`))
    );

    if (match) {
      if (match.status === "pending") return "bg-purple-400 text-white";
      if (match.status === "confirmed") return "bg-green-500 text-white";
      return "bg-red-400 text-white";
    }
    return "bg-gray-100";
  };

  const isContinuous = (blocks) => {
    const sorted = [...blocks].sort((a, b) =>
      dayjs(`2000-01-01T${a.start}`).isBefore(dayjs(`2000-01-01T${b.start}`)) ? -1 : 1
    );
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1].end !== sorted[i].start) return false;
    }
    return true;
  };

  const handleBook = async () => {
    if (selectedBlocks.length === 0) return alert("Select at least one slot.");
    if (!isContinuous(selectedBlocks)) return alert("Slots must be continuous.");

    const sorted = [...selectedBlocks].sort((a, b) =>
      dayjs(`2000-01-01T${a.start}`).isBefore(dayjs(`2000-01-01T${b.start}`)) ? -1 : 1
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const refSlot = slots.find((s) => s.id === first.slotId);

    const payload = {
      teacher: refSlot.teacher,
      date: refSlot.date,
      start_time: first.start + ":00",
      end_time: last.end + ":00",
      topic,
    };

    try {
      await bookSession(payload);
      alert("✅ Session booked!");
      setSelectedBlocks([]);
      navigate("/student/bookings");
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed.");
    }
  };

  const grouped = {};
  slots.forEach((s) => {
    const key = `${s.teacher}_${s.date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  const selectedSlot = selectedBlocks.length ? slots.find((s) => s.id === selectedBlocks[0].slotId) : null;
  const selectedTeacher = selectedSlot ? teachers[selectedSlot.teacher] : null;

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📅 Available Tutor Slots (All Teachers)</h2>

      {Object.entries(grouped).map(([groupKey, slotGroup]) => {
        const [teacherId, date] = groupKey.split("_");
        const teacher = teachers[teacherId];
        return (
          <div key={groupKey} className="mb-8 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">
              {teacher?.username || "Tutor"} || {date}
            </h3>

            <p className="text-sm mb-2">
              <strong>Subject:</strong> {slotGroup[0].subject || "N/A"} |{" "}
              <strong>Rate:</strong> ₹{slotGroup[0].rate || 0} ({slotGroup[0].rate_type}) |{" "}
              <strong>Platform:</strong> {slotGroup[0].platform || "N/A"} |{" "}
              <strong>Grade:</strong> {slotGroup[0].grade_level || "N/A"}
            </p>

            <div className="flex flex-wrap gap-2">
              {generateTimeBlocks(slotGroup[0].start_time, slotGroup[0].end_time).map((block) => {
                const baseClasses = isBlockSelected(slotGroup[0].id, block.start)
                  ? "bg-yellow-400 text-white"
                  : getBlockStatus(slotGroup[0].date, block.start, block.end);
                return (
                  <button
                    key={`${slotGroup[0].id}_${block.start}`}
                    onClick={() => toggleBlock(slotGroup[0].id, block)}
                    className={`px-3 py-1 rounded border ${baseClasses}`}
                  >
                    {block.start} - {block.end}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="mt-6 bg-white p-4 rounded shadow">
        <label className="block font-semibold mb-1">Topic (optional):</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Algebra, ReactJS, etc."
        />

        {selectedBlocks.length > 0 && selectedTeacher && (
          <div className="text-sm mb-4 bg-blue-50 p-3 rounded">
            <p><strong>Teacher:</strong> {selectedTeacher.username}</p>
            <p><strong>Date:</strong> {selectedSlot.date}</p>
            <p><strong>Start:</strong> {selectedBlocks[0].start}</p>
            <p><strong>End:</strong> {selectedBlocks[selectedBlocks.length - 1].end}</p>
            <p><strong>Rate:</strong> ₹{selectedSlot.rate} ({selectedSlot.rate_type})</p>
          </div>
        )}

        <button
          onClick={handleBook}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          ✅ Book Selected Slots
        </button>
      </div>
    </div>
  );
};

export default StudentSlotBrowser;
