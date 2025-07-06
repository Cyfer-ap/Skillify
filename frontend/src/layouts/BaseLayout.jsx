import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "../pages/StudentDashboard.css";

const BaseLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isStudentDashboard = location.pathname.includes("/student/dashboard");

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

  // 💡 Prevent body scroll when sidebar is open
  useEffect(() => {
    const shouldLockScroll = isStudentDashboard && sidebarOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";
    document.documentElement.style.overflow = shouldLockScroll ? "hidden" : "auto";
  
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [sidebarOpen, isStudentDashboard]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000', color: 'white' }}>
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Floating geometric shapes */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          width: '16px',
          height: '16px',
          background: '#22d3ee',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute',
          top: '160px',
          right: '128px',
          width: '24px',
          height: '24px',
          background: '#a855f7',
          borderRadius: '50%',
          animation: 'bounce 2s infinite',
          opacity: 0.4,
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '160px',
          left: '64px',
          width: '32px',
          height: '32px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.5,
          animationDelay: '2s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '80px',
          width: '20px',
          height: '20px',
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
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* HEADER - Updated to match Home.jsx style */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '16px 24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid #374151',
          flexShrink: 0,
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo and hamburger container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isStudentDashboard && (
              <span
                className="hamburger-icon"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                tabIndex={0}
                role="button"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <span style={{ width: '20px', height: '2px', backgroundColor: 'white', borderRadius: '1px' }}></span>
                <span style={{ width: '20px', height: '2px', backgroundColor: 'white', borderRadius: '1px' }}></span>
                <span style={{ width: '20px', height: '2px', backgroundColor: 'white', borderRadius: '1px' }}></span>
              </span>
            )}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: 0,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'pulse 2s infinite'
              }}>
                Skillify
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <NavLink href="#contact" color="#22d3ee">Contact Us</NavLink>
            <Link 
              to="/login" 
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* LEFT SIDEBAR MENU (only for student dashboard) */}
      {isStudentDashboard && (
        <nav className={`fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-50 transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} shadow-2xl`}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-32 right-16 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-40 left-12 w-5 h-5 bg-emerald-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 right-12 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '3s'}}></div>
          </div>

          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Menu
            </div>
            <button
              className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 group"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform duration-300">&times;</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/student/profile" 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-400 transition-all duration-300 text-gray-300 hover:text-white group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <span className="text-2xl group-hover:animate-pulse">👤</span>
                  <span className="font-medium">Profile</span>
                  <span className="ml-auto text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">→</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/student/teachers" 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 hover:border-purple-400 transition-all duration-300 text-gray-300 hover:text-white group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <span className="text-2xl group-hover:animate-pulse">🧑‍🏫</span>
                  <span className="font-medium">Browse Tutors</span>
                  <span className="ml-auto text-gray-500 group-hover:text-purple-400 transition-colors duration-300">→</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/student/bookings" 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 hover:border-emerald-400 transition-all duration-300 text-gray-300 hover:text-white group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <span className="text-2xl group-hover:animate-pulse">📅</span>
                  <span className="font-medium">My Bookings</span>
                  <span className="ml-auto text-gray-500 group-hover:text-emerald-400 transition-colors duration-300">→</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/notifications" 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/50 hover:border-pink-400 transition-all duration-300 text-gray-300 hover:text-white group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <span className="text-2xl group-hover:animate-pulse">🔔</span>
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto text-gray-500 group-hover:text-pink-400 transition-colors duration-300">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Skillify
              </div>
              <p className="text-gray-500 text-sm">
                Your learning journey
              </p>
            </div>
          </div>
        </nav>
      )}
      
      {/* Overlay when sidebar is open */}
      {isStudentDashboard && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

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
      `}</style>
    </div>
  );
};

// Navigation Link Component
const NavLink = ({ href, children, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        color: isHovered ? color : 'white',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        padding: '8px 16px',
        borderRadius: '4px',
        position: 'relative',
        outline: 'none',
        border: isHovered ? `2px solid ${color}` : '2px solid transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}
      <span style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: isHovered ? '100%' : '0',
        height: '2px',
        backgroundColor: color,
        transition: 'all 0.3s ease'
      }}></span>
    </a>
  );
};

export default BaseLayout;