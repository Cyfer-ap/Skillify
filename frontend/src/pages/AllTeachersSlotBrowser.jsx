import { useEffect, useState } from "react";
import { fetchTeachers, fetchAvailability } from "../api/api";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const getTimeBlocks = (start, end) => {
  const blocks = [];
  let current = dayjs(`2000-01-01T${start}`);
  const endTime = dayjs(`2000-01-01T${end}`);

  while (current.add(30, "minute").isSameOrBefore(endTime)) {
    const next = current.add(30, "minute");
    blocks.push({ start: current.format("HH:mm"), end: next.format("HH:mm") });
    current = next;
  }

  return blocks;
};

const AllTeachersSlotBrowser = () => {
  const [slots, setSlots] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  useEffect(() => {
    const loadSlots = async () => {
      try {
        const teacherRes = await fetchTeachers();

        const allSlots = await Promise.all(
          teacherRes.data.map(async (t) => {
            const res = await fetchAvailability(t.id);
            return res.data.map((s) => ({
              ...s,
              teacherName: t.username,
              teacherId: t.id,
            }));
          })
        );

        const flattened = allSlots.flat();
        setSlots(flattened);
      } catch (err) {
        console.error("Slot load error:", err);
      }
    };

    loadSlots();
  }, []);

  const handleBlockToggle = (slot, block) => {
    const id = `${slot.id}-${block.start}-${block.end}`;
    setSelectedBlocks((prev) =>
      prev.some((b) => b.id === id)
        ? prev.filter((b) => b.id !== id)
        : [...prev, { ...block, ...slot, id }]
    );
  };

  const getBlockColor = (slot, block) => {
    const id = `${slot.id}-${block.start}-${block.end}`;
    const isSelected = selectedBlocks.some((b) => b.id === id);

    // Placeholder: Real booking status color (mocked)
    const booked = false;
    const pending = false;

    if (booked) return "bg-gray-400";
    if (pending) return "bg-purple-400";
    if (isSelected) return "bg-green-500 text-white";
    return "bg-white";
  };

  const grouped = {};
  slots.forEach((s) => {
    const key = `${s.teacherName}||${s.date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">
        📅 Available Tutor Slots (All Teachers)
      </h2>

      {Object.entries(grouped).map(([key, group], i) => (
        <div key={i} className="bg-white rounded shadow p-4 mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            {key.split("||")[0].trim()} | {key.split("||")[1].trim()}
          </h3>

          {group.map((slot) => (
            <div key={slot.id} className="mb-3">
              <p className="text-sm text-gray-600">
                🎯 Subject: {slot.subject || "N/A"} | 💰 Rate: ₹{slot.rate} ({slot.rate_type}) | 💻 Platform: {slot.platform || "N/A"} | 🗣️ Language: {slot.language}
              </p>
              <div className="flex flex-wrap mt-2 gap-2">
                {getTimeBlocks(slot.start_time, slot.end_time).map((block, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded text-sm hover:scale-105 transition ${getBlockColor(slot, block)}`}
                    onClick={() => handleBlockToggle(slot, block)}
                  >
                    {block.start} - {block.end}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {selectedBlocks.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
          <h4 className="font-semibold mb-2">✅ Selected Slots</h4>
          <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
            {selectedBlocks.map((b, i) => (
              <li key={i}>
                📅 {b.date} | {b.teacherName} | {b.start} - {b.end} | Subject: {b.subject} | ₹{b.rate}
              </li>
            ))}
          </ul>
          <button
            onClick={() => alert("Booking confirmation popup (next step)")}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            📥 Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTeachersSlotBrowser;
