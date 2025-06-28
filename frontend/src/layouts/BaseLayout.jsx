import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDashboard = location.pathname.includes("/dashboard");

  // 💡 Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden"; // <== VERY IMPORTANT
    document.documentElement.style.overflow = "hidden"; // HTML tag too
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // full viewport
        overflow: "hidden", // Prevent outer scroll
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "#4338ca",
          color: "white",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        {isDashboard && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: "1",
            }}
          >
            ⋮
          </button>
        )}
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Skillify</h1>
      </header>

      {/* SIDEBAR Overlay */}
      {isDashboard && sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 40,
            }}
          ></div>

          <aside
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "250px",
              backgroundColor: "#ffffff",
              padding: "24px",
              boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
              zIndex: 50,
            }}
          >
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              📂 Menu
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "#1f2937",
                fontSize: "0.875rem",
              }}
            >
              <li style={linkStyle}>📅 My Sessions</li>
              <li style={linkStyle}>📄 My Notes</li>
              <li style={linkStyle}>👨‍🏫 Browse Tutors</li>
            </ul>
          </aside>
        </>
      )}

      {/* MAIN SCROLLABLE CONTENT */}
      <main
        style={{
          flex: 1,
          overflowY: "auto", // only this scrolls
          padding: "24px",
          backgroundColor: "lightblue",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
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
