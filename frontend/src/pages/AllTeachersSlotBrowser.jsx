import { useEffect, useState } from "react";
import { fetchAvailability, bookSession, fetchTeachers, fetchBookedSessions } from "../api/api";
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
  const [teachers, setTeachers] = useState({});
  const [topic, setTopic] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookedSlots, setBookedSlots] = useState([]); // Track booked slots
  const [pendingSlots, setPendingSlots] = useState([]); // Track pending slots
  const navigate = useNavigate();

  useEffect(() => {
  const loadAllData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTeachers();
      const teacherMap = {};
      const allSlots = [];

      for (const t of res.data) {
        teacherMap[t.id] = t;
        const availRes = await fetchAvailability(t.id);
        allSlots.push(...availRes.data);
      }

      const uniqueMap = {};
      allSlots.forEach(s => {
        const key = `${s.teacher}_${s.date}_${s.start_time}_${s.end_time}`;
        uniqueMap[key] = s;
      });

      setTeachers(teacherMap);
      setSlots(Object.values(uniqueMap));

      // ✅ Fetch booked & pending sessions
      const bookedRes = await fetchBookedSessions();
      const booked = [];
      const pending = [];

      for (const session of bookedRes.data) {
        const matchingSlot = Object.values(uniqueMap).find(slot =>
          slot.teacher === session.teacher &&
          slot.date === session.date &&
          session.start_time >= slot.start_time &&
          session.end_time <= slot.end_time
        );

        if (matchingSlot) {
          const blocks = generateTimeBlocks(session.start_time.slice(0, 5), session.end_time.slice(0, 5));
          for (const block of blocks) {
            const key = `${matchingSlot.id}_${block.start}`;
            if (session.status === 'confirmed') {
              booked.push(key);
            } else if (session.status === 'pending') {
              pending.push(key);
            }
          }
        }
      }

      setBookedSlots(booked);
      setPendingSlots(pending);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  loadAllData(); // ✅ Run once when component mounts
}, []);


  const getSlotStatus = (slotId, startTime) => {
    const blockKey = `${slotId}_${startTime}`;
    if (bookedSlots.includes(blockKey)) return 'booked';
    if (pendingSlots.includes(blockKey)) return 'pending';
    return 'available';
  };

  const getBlockStyles = (slotId, block) => {
    const status = getSlotStatus(slotId, block.start);
    const isSelected = isBlockSelected(slotId, block.start);

    if (isSelected) {
      return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-lg shadow-amber-500/30 transform scale-105';
    }

    switch (status) {
      case 'booked':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 cursor-not-allowed opacity-75';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-400 cursor-not-allowed opacity-75';
      case 'available':
        return 'bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 border-gray-500 hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 hover:transform hover:scale-105';
      default:
        return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'booked': return '🚫';
      case 'pending': return '⏳';
      case 'available': return '✅';
      default: return '';
    }
  };

  const toggleBlock = (slotId, block) => {
    const status = getSlotStatus(slotId, block.start);

    if (status === 'booked' || status === 'pending') {
      return alert(`❌ This slot is ${status}. Please select an available slot.`);
    }

    const slot = slots.find(s => s.id === slotId);
    const teacherId = slot.teacher;

    if (selectedBlocks.length > 0) {
      const currentTeacher = slots.find(s => s.id === selectedBlocks[0].slotId)?.teacher;
      if (teacherId !== currentTeacher) {
        return alert("❌ You can only book slots from one teacher at a time.");
      }
    }

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
    if (selectedBlocks.length === 0) return alert("Please select at least one slot.");
    if (!isContinuous(selectedBlocks)) return alert("❌ Please select continuous time slots only.");

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

      // Add booked slots to the state
      selectedBlocks.forEach(block => {
        setBookedSlots(prev => [...prev, `${block.slotId}_${block.start}`]);
      });

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

  const selectedSlot = selectedBlocks.length ? slots.find(s => s.id === selectedBlocks[0].slotId) : null;
  const selectedTeacher = selectedSlot ? teachers[selectedSlot.teacher] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-6 animate-spin">⏰</div>
          <div className="h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-48 mx-auto mb-4 animate-pulse"></div>
          <h2 className="text-2xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-bold">
            Loading available slots...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6 animate-bounce">🎯</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Book Your Learning Session
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose from our expert tutors and book your perfect learning session.
            Select continuous time slots that work best for your schedule.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-8 p-6 rounded-2xl bg-gray-800/60 backdrop-blur border border-gray-700">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4 text-center">📊 Slot Status Legend</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded border border-gray-500"></div>
              <span className="text-sm">✅ Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded border border-yellow-400"></div>
              <span className="text-sm">⏳ Pending Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded border border-red-400"></div>
              <span className="text-sm">🚫 Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded border border-amber-400"></div>
              <span className="text-sm">⭐ Selected</span>
            </div>
          </div>
        </div>

        {/* Tutor Slots */}
        {Object.entries(grouped).map(([groupKey, slotGroup]) => {
          const [teacherId, date] = groupKey.split("_");
          const teacher = teachers[teacherId];
          const slot = slotGroup[0];

          return (
            <div key={groupKey} className="mb-8 p-8 rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
              {/* Teacher Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="text-4xl w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                  <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-3xl">
                    {teacher?.avatar || '👨‍🏫'}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {teacher?.username || "Expert Tutor"}
                  </h3>
                  <p className="text-gray-400 text-lg flex items-center gap-2">
                    📅 {dayjs(date).format("dddd, MMMM D, YYYY")}
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-sm">Available</span>
                  </p>
                </div>
              </div>

              {/* Slot Details */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-cyan-400 font-semibold text-sm">Subject</div>
                  <div className="text-white font-bold">{slot.subject}</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-green-400 font-semibold text-sm">Rate</div>
                  <div className="text-white font-bold">₹{slot.rate} ({slot.rate_type})</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="text-2xl mb-2">🎓</div>
                  <div className="text-purple-400 font-semibold text-sm">Grade Level</div>
                  <div className="text-white font-bold">{slot.grade_level}</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <div className="text-2xl mb-2">🔗</div>
                  <div className="text-orange-400 font-semibold text-sm">Platform</div>
                  <div className="text-white font-bold">{slot.platform}</div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h4 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  ⏰ Available Time Slots
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {generateTimeBlocks(slot.start_time, slot.end_time).map((block) => {
                    const status = getSlotStatus(slot.id, block.start);
                    const isClickable = status === 'available';

                    return (
                      <button
                        key={`${slot.id}_${block.start}`}
                        onClick={() => isClickable && toggleBlock(slot.id, block)}
                        onMouseEnter={() => setHoveredBlock(`${slot.id}_${block.start}`)}
                        onMouseLeave={() => setHoveredBlock(null)}
                        disabled={!isClickable}
                        className={`
                          px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-300 relative
                          ${getBlockStyles(slot.id, block)}
                          ${hoveredBlock === `${slot.id}_${block.start}` && isClickable ? 'ring-2 ring-cyan-400' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{block.start} - {block.end}</span>
                          <span className="text-xs">{getStatusIcon(status)}</span>
                        </div>
                        {hoveredBlock === `${slot.id}_${block.start}` && isClickable && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Booking Panel */}
        <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 sticky bottom-5 shadow-2xl">
          <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            📝 Complete Your Booking
          </h3>

          <div className="mb-6">
            <label className="block font-semibold mb-3 text-gray-300 text-lg">
              📋 Session Topic (Optional):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Advanced Algebra, React Hooks, Organic Chemistry..."
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-600 bg-gray-800/80 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-300"
            />
          </div>

          {selectedBlocks.length > 0 && selectedTeacher && (
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/30 rounded-xl p-6 mb-6">
              <h4 className="text-cyan-300 font-bold text-xl mb-4 flex items-center gap-2">
                📋 Booking Summary
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-cyan-400">👨‍🏫 Teacher:</span>
                    <span className="text-white">{selectedTeacher.username}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-purple-400">📅 Date:</span>
                    <span className="text-white">{dayjs(selectedSlot.date).format("MMM D, YYYY")}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-green-400">⏰ Time:</span>
                    <span className="text-white">{selectedBlocks[0].start} - {selectedBlocks[selectedBlocks.length - 1].end}</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-orange-400">⏱️ Duration:</span>
                    <span className="text-white">{selectedBlocks.length * 0.5} hours</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-yellow-400">💰 Rate:</span>
                    <span className="text-white">₹{selectedSlot.rate} ({selectedSlot.rate_type})</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-pink-400">📚 Subject:</span>
                    <span className="text-white">{selectedSlot.subject}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBook}
            disabled={selectedBlocks.length === 0}
            className={`
              w-full py-6 rounded-xl text-xl font-bold transition-all duration-300 transform
              ${selectedBlocks.length > 0 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedBlocks.length > 0 ? '✅ Book Selected Slots' : '⚠️ Select Time Slots to Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSlotBrowser;
