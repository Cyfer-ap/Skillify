// src/pages/StudentSlotBrowser.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAvailability } from "../api/api";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const StudentSlotBrowser = () => {
  const { teacherId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    fetchAvailability(teacherId)
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("Failed to fetch availability:", err));
  }, [teacherId]);

  const generateTimeBlocks = (start, end) => {
    const blocks = [];
    let current = dayjs(`2000-01-01T${start}`);
    const endTime = dayjs(`2000-01-01T${end}`);
    while (current.isBefore(endTime)) {
      const blockEnd = current.add(30, "minute");
      blocks.push({
        start: current.format("HH:mm"),
        end: blockEnd.format("HH:mm"),
      });
      current = blockEnd;
    }
    return blocks;
  };

  const handleSelectSlot = (slot, time) => {
    const key = `${slot.id}-${time.start}`;
    const alreadySelected = selectedTimes.find((s) => s.key === key);
    if (alreadySelected) {
      setSelectedTimes((prev) => prev.filter((s) => s.key !== key));
    } else {
      setSelectedTimes((prev) => [...prev, { ...slot, ...time, key }]);
    }
    setSelectedSlot(slot);
  };

  const isBlockSelected = (slotId, time) =>
    selectedTimes.find((s) => s.key === `${slotId}-${time.start}`);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🧑‍🏫 Select Slot for Booking</h2>
      {slots.map((slot) => (
        <div key={slot.id} className="mb-6 border p-4 rounded">
          <h4 className="font-semibold mb-2">
            {slot.date} | {slot.subject} ({slot.platform})
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {generateTimeBlocks(slot.start_time, slot.end_time).map((block, idx) => {
              const isSelected = isBlockSelected(slot.id, block);
              return (
                <button
                  key={idx}
                  className={`p-2 text-sm rounded border 
                    ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-green-100 hover:bg-green-300"
                    }`}
                  onClick={() => handleSelectSlot(slot, block)}
                >
                  {block.start} - {block.end}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedTimes.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Selected Time Blocks:</h3>
          <ul className="list-disc ml-5 mb-4">
            {selectedTimes.map((b, idx) => (
              <li key={idx}>
                {b.date} | {b.start} - {b.end}
              </li>
            ))}
          </ul>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => alert("📌 Booking modal will appear here")}
          >
            ✅ Book Selected Slot(s)
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentSlotBrowser;
