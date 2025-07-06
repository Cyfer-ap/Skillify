import { useEffect, useState } from "react";
import { fetchTeachers } from "../api/api";
import { useNavigate } from "react-router-dom";


const BrowseTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers()
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
      fetchTeachers()
        .then((res) => {
          console.log("Teachers:", res.data);   // 👈 add this
          setTeachers(res.data);
        })
        .catch((err) => {
          console.error("Error loading teachers:", err.response?.data || err.message);
        });
    }, []);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Tutors</h2>
      <ul className="space-y-4">
        {teachers.map((t) => (
          <li key={t.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{t.username}</h3>
            <p>Email: {t.email}</p>
            <p>Bio: {t.bio || "N/A"}</p>
            <p>Phone: {t.phone || "N/A"}</p>
            <button
              onClick={() => navigate(`/book/${t.id}`)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default BrowseTeachers;
