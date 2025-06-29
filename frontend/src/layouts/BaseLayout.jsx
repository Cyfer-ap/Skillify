import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "../pages/StudentDashboard.css";

const BaseLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isStudentDashboard = location.pathname.includes("/student/dashboard");


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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "#4338ca",
          color: "white",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexShrink: 0,
        }}
      >
        {isStudentDashboard && (
          <span
            className="hamburger-icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            tabIndex={0}
            role="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        )}
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, lineHeight: 1 }}>Skillify</h1>
      </header>

      {/* Sidebar Menu (only for student dashboard) */}
      {isStudentDashboard && (
        <nav className={`sidebar-menu${sidebarOpen ? " open" : ""}`}>
          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
            <ul>
                <li>
                    <Link to="/student/profile" onClick={() => setSidebarOpen(false)}>👤 Profile</Link>
                </li>
                <li>
                    <Link to="/student/teachers" onClick={() => setSidebarOpen(false)}>🧑‍🏫 Browse Tutors</Link>
                </li>
                <li>
                    <Link to="/student/bookings" onClick={() => setSidebarOpen(false)}>📅 My Bookings</Link>
                </li>
                <li>
                    <Link to="/notifications" onClick={() => setSidebarOpen(false)}>🔔 Notifications</Link>
                </li>
            </ul>
        </nav>
      )}
        {/* Overlay when sidebar is open */}
        {isStudentDashboard && sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

const linkStyle = {
  marginBottom: "12px",
  cursor: "pointer",
  transition: "color 0.3s ease",
};

export default BaseLayout;
