import { useEffect, useState } from "react";
import { fetchMyBookings, updateSessionStatus } from "../api/api";
import dayjs from "dayjs";

const MyBookings = () => {
  const [sessions, setSessions] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const token = localStorage.getItem("access");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userRole = payload?.role;

  useEffect(() => {
    setIsVisible(true);
    fetchMyBookings()
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this session?");
    if (!confirm) return;

    try {
      await updateSessionStatus(id, "cancelled");
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: "cancelled" } : s))
      );
      alert("✅ Session cancelled");
    } catch (err) {
      console.error("Failed to cancel:", err);
      alert("❌ Could not cancel session");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#10b981'; // Green
      case 'pending':
        return '#f59e0b'; // Yellow
      case 'cancelled':
        return '#ef4444'; // Red
      case 'completed':
        return '#22d3ee'; // Cyan
      default:
        return '#9ca3af'; // Gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '❌';
      case 'completed':
        return '🎓';
      default:
        return '📅';
    }
  };

  const getCardStyle = (index) => ({
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(12px)',
    border: hoveredCard === index ? '2px solid #22d3ee' : '1px solid rgba(55, 65, 81, 0.5)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '20px',
    transition: 'all 0.4s ease',
    transform: isVisible
      ? hoveredCard === index
        ? 'translateY(-4px) scale(1.01)'
        : 'translateY(0) scale(1)'
      : 'translateY(30px)',
    opacity: isVisible ? 1 : 0,
    transitionDelay: `${index * 0.1}s`,
    boxShadow: hoveredCard === index
      ? '0 20px 40px rgba(34, 211, 238, 0.2)'
      : '0 4px 6px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  });

  return (
    <div className="my-bookings-container" style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Floating geometric shapes */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '18px',
          height: '18px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse 3s infinite',
          opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: '14px',
          height: '14px',
          background: '#22d3ee',
          borderRadius: '50%',
          animation: 'bounce 2.5s infinite',
          opacity: 0.4,
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '10%',
          width: '20px',
          height: '20px',
          background: '#f59e0b',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.5,
          animationDelay: '2s'
        }}></div>

        {/* Animated grid background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)'
          }}></div>
        </div>

        {/* Floating particles */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pulse 3s infinite',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px',
            animation: 'bounce 2s infinite'
          }}>📅</div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            My Sessions
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#9ca3af',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Track and manage all your scheduled learning sessions
          </p>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div style={{
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(55, 65, 81, 0.5)',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.6 }}>📭</div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#9ca3af',
              margin: 0,
              marginBottom: '8px'
            }}>
              No sessions yet
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem'
            }}>
              Your booked sessions will appear here once you schedule them.
            </p>
          </div>
        ) : (
          <div>
            {sessions.map((s, index) => (
              <div
                key={s.id}
                style={getCardStyle(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${getStatusColor(s.status)}10 0%, transparent 100%)`,
                  pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header with status */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        fontSize: '2rem'
                      }}>
                        👨‍🏫
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          margin: 0,
                          color: '#22d3ee'
                        }}>
                          {userRole === "student" ? s.teacher_name : s.student_name}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#9ca3af',
                          margin: 0
                        }}>
                          {userRole === "student" ? "Teacher" : "Student"}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: `${getStatusColor(s.status)}20`,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: `1px solid ${getStatusColor(s.status)}40`
                    }}>
                      <span style={{ fontSize: '1rem' }}>{getStatusIcon(s.status)}</span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: getStatusColor(s.status),
                        textTransform: 'capitalize'
                      }}>
                        {s.status}
                      </span>
                    </div>
                  </div>

                  {/* Session Details Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(75, 85, 99, 0.4)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>📅</span>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: '#a855f7'
                        }}>
                          Date & Time
                        </span>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        color: '#e5e7eb'
                      }}>
                        {s.date}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#9ca3af'
                      }}>
                        {dayjs(`2000-01-01T${s.start_time}`).format("hh:mm A")} - {dayjs(`2000-01-01T${s.end_time}`).format("hh:mm A")}
                      </p>
                    </div>

                    <div style={{
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(75, 85, 99, 0.4)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>📚</span>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: '#10b981'
                        }}>
                          Topic
                        </span>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        color: s.topic ? '#e5e7eb' : '#9ca3af'
                      }}>
                        {s.topic || "No topic specified"}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {userRole === "student" && s.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(s.id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.5)',
                        color: '#fca5a5',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                        e.target.style.borderColor = '#ef4444';
                        e.target.style.color = '#ef4444';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                        e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        e.target.style.color = '#fca5a5';
                      }}
                    >
                      <span>❌</span>
                      Cancel Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .my-bookings-container * {
          box-sizing: border-box;
        }
        
        .my-bookings-container {
          background: #000 !important;
          color: white !important;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25%); }
        }

        @media (max-width: 768px) {
          .session-details-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Override any potential CSS conflicts */
        .my-bookings-container div {
          background: inherit;
        }
        
        .my-bookings-container h1,
        .my-bookings-container h2,
        .my-bookings-container h3,
        .my-bookings-container p {
          color: inherit !important;
        }

        .my-bookings-container button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default MyBookings;