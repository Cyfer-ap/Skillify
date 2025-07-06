import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredActivity, setHoveredActivity] = useState(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dashboardItems = [
    {
      title: "Profile",
      icon: "👤",
      description: "Manage your personal information and settings",
      color: "#22d3ee",
      path: "/student/profile"
    },
    {
      title: "Browse Tutors",
      icon: "🧑‍🏫",
      description: "Find and connect with expert tutors",
      color: "#a855f7",
      path: "/student/teachers"
    },
    {
      title: "My Bookings",
      icon: "📅",
      description: "View and manage your scheduled sessions",
      color: "#10b981",
      path: "/student/bookings"
    },
    {
      title: "Book a Session",
      icon: "📌",
      description: "Schedule new sessions with available tutors",
      color: "#ec4899",
      path: "/student/slots"
    },
    {
      title: "Connect with Tutors",
      icon: "👩‍🏫",
      description: "Chat and communicate with your tutors",
      color: "#f59e0b",
      path: "/student/connect"
    },
    {
      title: "Upcoming Sessions",
      icon: "📆",
      description: "View your scheduled upcoming classes",
      color: "#8b5cf6",
      path: "/student/upcoming"
    },
    {
      title: "Class Notes",
      icon: "📝",
      description: "Access notes and session recordings",
      color: "#06b6d4",
      path: "/student/notes"
    },
    {
      title: "Learning Stats",
      icon: "⭐",
      description: "Review your progress and feedback",
      color: "#ef4444",
      path: "/student/stats"
    }
  ];

  const recentActivities = [
    { activity: "Completed Math session with Dr. Smith", time: "2 hours ago", type: "session" },
    { activity: "New assignment uploaded for Physics", time: "5 hours ago", type: "assignment" },
    { activity: "Feedback received from Chemistry tutor", time: "1 day ago", type: "feedback" },
    { activity: "Upcoming session reminder: Biology", time: "Tomorrow 2 PM", type: "reminder" }
  ];

  const getColorRgb = (color) => {
    const colorMap = {
      '#22d3ee': '34, 211, 238',
      '#a855f7': '168, 85, 247',
      '#10b981': '16, 185, 129',
      '#ec4899': '236, 72, 153',
      '#f59e0b': '245, 158, 11',
      '#8b5cf6': '139, 92, 246',
      '#06b6d4': '6, 182, 212',
      '#ef4444': '239, 68, 68'
    };
    return colorMap[color] || '255, 255, 255';
  };

  const getCardStyle = (index, item) => ({
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    backdropFilter: 'blur(12px)',
    border: hoveredCard === index ? `1px solid ${item.color}` : '1px solid rgba(55, 65, 81, 0.3)',
    borderRadius: '20px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    transform: isVisible 
      ? hoveredCard === index 
        ? 'translateY(-8px) scale(1.02)' 
        : 'translateY(0) scale(1)' 
      : 'translateY(50px) scale(0.9)',
    opacity: isVisible ? 1 : 0,
    transitionDelay: `${index * 0.1}s`,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: hoveredCard === index 
      ? `0 20px 40px rgba(${getColorRgb(item.color)}, 0.3)` 
      : 'none'
  });

  const getActivityStyle = (index) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: hoveredActivity === index ? 'rgba(55, 65, 81, 0.4)' : 'rgba(55, 65, 81, 0.2)',
    borderRadius: '12px',
    border: hoveredActivity === index ? '1px solid #22d3ee' : '1px solid rgba(75, 85, 99, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  });

  return (
    <div style={{ 
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
          top: '10%',
          left: '10%',
          width: '20px',
          height: '20px',
          background: '#22d3ee',
          borderRadius: '50%',
          animation: 'pulse 3s infinite',
          opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '16px',
          height: '16px',
          background: '#a855f7',
          borderRadius: '50%',
          animation: 'bounce 2.5s infinite',
          opacity: 0.4,
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: '24px',
          height: '24px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.5,
          animationDelay: '2s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '12%',
          width: '18px',
          height: '18px',
          background: '#ec4899',
          borderRadius: '50%',
          animation: 'bounce 2s infinite',
          opacity: 0.6,
          animationDelay: '3s'
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
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
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
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            animation: 'bounce 2s infinite'
          }}>🎓</div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Student Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#9ca3af',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Welcome to your personalized learning hub. Track your progress, connect with tutors, and manage your educational journey.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              style={getCardStyle(index, item)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${item.color}10 0%, transparent 100%)`,
                pointerEvents: 'none'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '16px',
                  display: 'block'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0,
                  marginBottom: '12px',
                  color: item.color
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.95rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities Section */}
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(55, 65, 81, 0.3)',
          borderRadius: '20px',
          padding: '40px',
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s ease-out',
          transitionDelay: '0.8s'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            margin: 0,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center'
          }}>
            📊 Recent Activities
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                style={getActivityStyle(index)}
                onMouseEnter={() => setHoveredActivity(index)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: activity.type === 'session' ? '#10b981' : 
                                   activity.type === 'assignment' ? '#f59e0b' : 
                                   activity.type === 'feedback' ? '#22d3ee' : '#ec4899',
                  flexShrink: 0
                }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0,
                    marginBottom: '4px',
                    fontSize: '0.95rem',
                    fontWeight: '500'
                  }}>
                    {activity.activity}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#9ca3af'
                  }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          {[
            { label: 'Total Sessions', value: '24', icon: '📚', color: '#22d3ee' },
            { label: 'Hours Learned', value: '48', icon: '⏰', color: '#a855f7' },
            { label: 'Active Tutors', value: '6', icon: '👨‍🏫', color: '#10b981' },
            { label: 'Avg Rating', value: '4.8', icon: '⭐', color: '#f59e0b' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(55, 65, 81, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease-out',
                transitionDelay: `${1 + index * 0.1}s`
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#9ca3af'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
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
          50% { transform: translateY(-25%); }
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;