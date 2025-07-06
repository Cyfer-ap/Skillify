import { useEffect, useState } from "react";

// Mock API functions for demo
const mockFetchTeachers = async () => ({
  data: [
    { id: 1, username: "Dr. Sarah Johnson", subject: "Mathematics", avatar: "👩‍🏫" },
    { id: 2, username: "Prof. Michael Chen", subject: "Physics", avatar: "👨‍🏫" },
    { id: 3, username: "Ms. Emily Davis", subject: "Chemistry", avatar: "👩‍🔬" },
    { id: 4, username: "Mr. David Wilson", subject: "Biology", avatar: "👨‍🔬" },
  ]
});

const mockFetchAvailableSlots = async () => ({
  data: [
    { id: 1, teacher: 1, date: "2025-07-08", start_time: "09:00", end_time: "12:00", subject: "Mathematics", rate: 500, rate_type: "per hour", platform: "Zoom", grade_level: "Grade 10-12" },
    { id: 2, teacher: 1, date: "2025-07-09", start_time: "14:00", end_time: "17:00", subject: "Mathematics", rate: 500, rate_type: "per hour", platform: "Zoom", grade_level: "Grade 10-12" },
    { id: 3, teacher: 2, date: "2025-07-08", start_time: "10:00", end_time: "13:00", subject: "Physics", rate: 600, rate_type: "per hour", platform: "Google Meet", grade_level: "Grade 11-12" },
    { id: 4, teacher: 3, date: "2025-07-10", start_time: "15:00", end_time: "18:00", subject: "Chemistry", rate: 550, rate_type: "per hour", platform: "Zoom", grade_level: "Grade 10-12" },
  ]
});

const mockFetchMyBookings = async () => ({
  data: [
    { date: "2025-07-08", start_time: "10:00", end_time: "11:00", status: "confirmed" },
    { date: "2025-07-09", start_time: "15:00", end_time: "16:00", status: "pending" },
  ]
});

const generateTimeBlocks = (start, end, interval = 30) => {
  const result = [];
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const nextMin = currentMin + interval;
    const nextHour = currentHour + Math.floor(nextMin / 60);
    const finalMin = nextMin % 60;
    
    if (nextHour < endHour || (nextHour === endHour && finalMin <= endMin)) {
      result.push({
        start: `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`,
        end: `${nextHour.toString().padStart(2, '0')}:${finalMin.toString().padStart(2, '0')}`
      });
    }
    
    currentHour = nextHour;
    currentMin = finalMin;
  }
  
  return result;
};

const StudentSlotBrowser = () => {
  const [slots, setSlots] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [topic, setTopic] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        const [teachersRes, availabilityRes, bookingsRes] = await Promise.all([
          mockFetchTeachers(),
          mockFetchAvailableSlots(),
          mockFetchMyBookings(),
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
      } finally {
        setIsLoading(false);
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
        alert("❌ Book from only one teacher at a time.");
        return;
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
      (b) => b.date === date && b.start_time === startTime
    );

    if (match) {
      if (match.status === "pending") return { bg: "bg-purple-500", text: "text-white", label: "Pending" };
      if (match.status === "confirmed") return { bg: "bg-green-500", text: "text-white", label: "Confirmed" };
      return { bg: "bg-red-500", text: "text-white", label: "Unavailable" };
    }
    return { bg: "bg-gray-100", text: "text-gray-700", label: "Available" };
  };

  const isContinuous = (blocks) => {
    const sorted = [...blocks].sort((a, b) => a.start.localeCompare(b.start));
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1].end !== sorted[i].start) return false;
    }
    return true;
  };

  const handleBook = async () => {
    if (selectedBlocks.length === 0) {
      alert("Select at least one slot.");
      return;
    }
    if (!isContinuous(selectedBlocks)) {
      alert("Slots must be continuous.");
      return;
    }

    const sorted = [...selectedBlocks].sort((a, b) => a.start.localeCompare(b.start));
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
      // Mock booking success
      console.log("Booking payload:", payload);
      alert("✅ Session booked successfully!");
      setSelectedBlocks([]);
      setTopic("");
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

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px', animation: 'pulse 2s infinite' }}>📅</div>
          <h2 style={{ fontSize: '1.5rem', color: '#22d3ee' }}>Loading available slots...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: 'white',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'bounce 2s infinite' }}>📅</div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Available Tutor Slots
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#9ca3af',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Browse and book sessions with our expert tutors. Select continuous time slots to schedule your learning session.
          </p>
        </div>

        {/* Slots Grid */}
        <div style={{ display: 'grid', gap: '24px', marginBottom: '40px' }}>
          {Object.entries(grouped).map(([groupKey, slotGroup]) => {
            const [teacherId, date] = groupKey.split("_");
            const teacher = teachers[teacherId];
            const slot = slotGroup[0];
            const isHovered = hoveredSlot === groupKey;
            
            return (
              <div
                key={groupKey}
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: isHovered ? '1px solid #22d3ee' : '1px solid rgba(55, 65, 81, 0.3)',
                  borderRadius: '20px',
                  padding: '32px',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 20px 40px rgba(34, 211, 238, 0.2)' : 'none'
                }}
                onMouseEnter={() => setHoveredSlot(groupKey)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                {/* Teacher Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '3rem',
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(34, 211, 238, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #22d3ee'
                  }}>
                    {teacher?.avatar || '👨‍🏫'}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      margin: 0,
                      marginBottom: '4px',
                      color: '#22d3ee'
                    }}>
                      {teacher?.username || "Tutor"}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      📅 {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Session Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px',
                  padding: '20px',
                  backgroundColor: 'rgba(55, 65, 81, 0.2)',
                  borderRadius: '12px'
                }}>
                  <div>
                    <span style={{ color: '#22d3ee', fontWeight: '600' }}>📚 Subject:</span>
                    <span style={{ marginLeft: '8px' }}>{slot.subject || "N/A"}</span>
                  </div>
                  <div>
                    <span style={{ color: '#a855f7', fontWeight: '600' }}>💰 Rate:</span>
                    <span style={{ marginLeft: '8px' }}>₹{slot.rate || 0} ({slot.rate_type})</span>
                  </div>
                  <div>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>🎓 Grade:</span>
                    <span style={{ marginLeft: '8px' }}>{slot.grade_level || "N/A"}</span>
                  </div>
                  <div>
                    <span style={{ color: '#f59e0b', fontWeight: '600' }}>🔗 Platform:</span>
                    <span style={{ marginLeft: '8px' }}>{slot.platform || "N/A"}</span>
                  </div>
                </div>

                {/* Time Blocks */}
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#ec4899'
                  }}>
                    ⏰ Available Time Slots
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {generateTimeBlocks(slot.start_time, slot.end_time).map((block) => {
                      const blockKey = `${slot.id}_${block.start}`;
                      const isSelected = isBlockSelected(slot.id, block.start);
                      const status = getBlockStatus(slot.date, block.start, block.end);
                      const isHoveredBlock = hoveredBlock === blockKey;
                      
                      return (
                        <button
                          key={blockKey}
                          onClick={() => toggleBlock(slot.id, block)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid #f59e0b' : isHoveredBlock ? '2px solid #22d3ee' : '1px solid rgba(75, 85, 99, 0.3)',
                            backgroundColor: isSelected ? '#f59e0b' : status.bg === 'bg-gray-100' ? 'rgba(55, 65, 81, 0.3)' : 
                                           status.bg === 'bg-purple-500' ? '#8b5cf6' :
                                           status.bg === 'bg-green-500' ? '#10b981' : '#ef4444',
                            color: isSelected ? 'white' : status.text === 'text-white' ? 'white' : '#e5e7eb',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: status.bg === 'bg-gray-100' ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            transform: isHoveredBlock && status.bg === 'bg-gray-100' ? 'translateY(-2px)' : 'translateY(0)',
                            opacity: status.bg === 'bg-gray-100' ? 1 : 0.7
                          }}
                          onMouseEnter={() => setHoveredBlock(blockKey)}
                          onMouseLeave={() => setHoveredBlock(null)}
                          disabled={status.bg !== 'bg-gray-100'}
                        >
                          <div>{block.start} - {block.end}</div>
                          {status.label !== 'Available' && (
                            <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>
                              {status.label}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Panel */}
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(55, 65, 81, 0.3)',
          borderRadius: '20px',
          padding: '32px',
          position: 'sticky',
          bottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#22d3ee',
            textAlign: 'center'
          }}>
            📝 Book Your Session
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#e5e7eb'
            }}>
              Topic (Optional):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Algebra, React Hooks, Organic Chemistry..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                backgroundColor: 'rgba(55, 65, 81, 0.3)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#22d3ee'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(75, 85, 99, 0.3)'}
            />
          </div>

          {selectedBlocks.length > 0 && selectedTeacher && (
            <div style={{
              backgroundColor: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#22d3ee'
              }}>
                📋 Booking Summary
              </h4>
              <div style={{ display: 'grid', gap: '8px', fontSize: '0.95rem' }}>
                <div><strong>Teacher:</strong> {selectedTeacher.username}</div>
                <div><strong>Date:</strong> {new Date(selectedSlot.date).toLocaleDateString()}</div>
                <div><strong>Time:</strong> {selectedBlocks[0].start} - {selectedBlocks[selectedBlocks.length - 1].end}</div>
                <div><strong>Duration:</strong> {selectedBlocks.length * 0.5} hours</div>
                <div><strong>Rate:</strong> ₹{selectedSlot.rate} ({selectedSlot.rate_type})</div>
              </div>
            </div>
          )}

          <button
            onClick={handleBook}
            disabled={selectedBlocks.length === 0}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: selectedBlocks.length > 0 ? '#22d3ee' : 'rgba(55, 65, 81, 0.5)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: selectedBlocks.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              transform: selectedBlocks.length > 0 ? 'translateY(0)' : 'translateY(0)',
              opacity: selectedBlocks.length > 0 ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              if (selectedBlocks.length > 0) {
                e.target.style.backgroundColor = '#0891b2';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBlocks.length > 0) {
                e.target.style.backgroundColor = '#22d3ee';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {selectedBlocks.length > 0 ? '✅ Book Selected Slots' : '⚠️ Select Time Slots to Book'}
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .time-blocks {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default StudentSlotBrowser;