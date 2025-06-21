// src/layouts/BaseLayout.jsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Skillify</h1>
        {isDashboard && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded transition"
          >
            {sidebarOpen ? "Hide Menu" : "Show Menu"}
          </button>
        )}
      </header>

      {/* BODY CONTAINER: SIDEBAR + MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {isDashboard && sidebarOpen && (
          <aside className="w-64 bg-gray-100 border-r border-gray-300 p-4 flex-shrink-0 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">📂 Menu</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li className="hover:text-indigo-600 cursor-pointer">📅 My Sessions</li>
              <li className="hover:text-indigo-600 cursor-pointer">📄 My Notes</li>
              <li className="hover:text-indigo-600 cursor-pointer">👨‍🏫 Browse Tutors</li>
            </ul>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
