import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/api"; // use the exported function

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications()
      .then((res) => setNotifications(res.data))
      .catch((err) => {
        console.error("Notification API error:", err);
        setError("⚠️ Could not load notifications.");
      });
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-red-600">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => {
            const { id, message, created_at, link } = notif || {};
            const dateStr = created_at
              ? new Date(created_at).toLocaleString()
              : "Unknown time";

            return (
              <li key={id || Math.random()} className="p-4 border rounded shadow bg-white">
                <div className="font-semibold">{message || "No message"}</div>
                <div className="text-sm text-gray-500">{dateStr}</div>
                {link && (
                  <a href={link} className="text-blue-600 text-sm underline">
                    View Details
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
