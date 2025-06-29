import { useEffect, useState } from "react";
import { fetchAvailability, bookSession, fetchTeachers } from "../api/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const generateTimeBlocks = (start, end, interval = 30) => {
  const result = [];
  let current = dayjs(`2000-01-01T${start}`);
  const endTime = dayjs(`2000-01-01T${end}`);

  while (current.add(interval, "minute").isBefore(endTime) || current.add(interval, "minute").isSame(endTime)) {
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
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const res = await fetchTeachers();
        const teacherMap = {};
        const allSlots = [];

        for (const t of res.data) {
          teacherMap[t.id] = t;
          const availRes = await fetchAvailability(t.id);
          allSlots.push(...availRes.data);
        }

        // Remove duplicates if any
        const uniqueMap = {};
        allSlots.forEach(s => {
          const key = `${s.teacher}_${s.date}_${s.start_time}_${s.end_time}`;
          uniqueMap[key] = s;
        });

        setTeachers(teacherMap);
        setSlots(Object.values(uniqueMap));
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadAllData();
  }, []);

  const toggleBlock = (slotId, block) => {
    const key = `${slotId}_${block.start}`;
    const exists = selectedBlocks.find(b => b.key === key);

    if (exists) {
      setSelectedBlocks(prev => prev.filter(b => b.key !== key));
    } else {
      setSelectedBlocks(prev => [
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
    selectedBlocks.some(b => b.slotId === slotId && b.start === start);

  const handleBook = async () => {
    if (selectedBlocks.length === 0) return alert("Please select at least one slot.");
    const sorted = [...selectedBlocks].sort((a, b) =>
      dayjs(`2000-01-01T${a.start}`).isBefore(dayjs(`2000-01-01T${b.start}`)) ? -1 : 1
    );

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const refSlot = slots.find(s => s.id === first.slotId);
    const payload = {
      teacher: refSlot.teacher,
      date: refSlot.date,
      start_time: first.start + ":00",
      end_time: last.end + ":00",
      topic,
    };

    try {
      await bookSession(payload);
      alert("✅ Session booked successfully!");
      setSelectedBlocks([]);
      navigate("/student/bookings");
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed. Try again.");
    }
  };

  const grouped = {};
  slots.forEach(s => {
    const key = `${s.teacher}_${s.date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

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
              {generateTimeBlocks(slotGroup[0].start_time, slotGroup[0].end_time).map(block => (
                <button
                  key={`${slotGroup[0].id}_${block.start}`}
                  onClick={() => toggleBlock(slotGroup[0].id, block)}
                  className={`px-3 py-1 rounded border ${
                    isBlockSelected(slotGroup[0].id, block.start)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {block.start} - {block.end}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-6">
        <label className="block font-semibold mb-1">Topic (optional):</label>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Algebra, ReactJS, etc."
        />
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
