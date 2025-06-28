import { useEffect, useState } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => {
        console.warn("No profile found or fetch failed. Initializing empty form.");
        setForm({});
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      await axios.put("http://127.0.0.1:8000/api/profile/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setMessage("❌ Update failed. Check required fields.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      {message && <p className="text-sm mb-2 text-red-600">{message}</p>}

      {!editMode ? (
        <div>
          <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Edit Profile
          </button>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Full Name:</strong> {form.full_name || "N/A"}</p>
            <p><strong>Guardian Name:</strong> {form.guardian_name || "N/A"}</p>
            <p><strong>Gender:</strong> {form.gender || "N/A"}</p>
            <p><strong>DOB:</strong> {form.dob || "N/A"}</p>
            <p><strong>Location:</strong> {form.location || "N/A"}</p>
            <p><strong>Subjects of Interest:</strong> {Array.isArray(form.subjects_interest) ? form.subjects_interest.join(", ") : form.subjects_interest || "N/A"}</p>
            <p><strong>Grade Level:</strong> {form.grade_level || "N/A"}</p>
            <p><strong>Preferred Languages:</strong> {Array.isArray(form.preferred_languages) ? form.preferred_languages.join(", ") : form.preferred_languages || "N/A"}</p>
            <p><strong>Learning Mode:</strong> {form.learning_mode || "N/A"}</p>
            <p><strong>Goals:</strong> {form.goals || "N/A"}</p>
            <p><strong>Preferred Time Slots:</strong> {Array.isArray(form.time_slots) ? form.time_slots.join(", ") : form.time_slots || "N/A"}</p>
            <p><strong>Payment Methods:</strong> {Array.isArray(form.payment_methods) ? form.payment_methods.join(", ") : form.payment_methods || "N/A"}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full Name" className="w-full border p-2" />
          <input type="file" name="profile_picture" onChange={handleChange} />
          <input type="text" name="guardian_name" value={form.guardian_name || ""} onChange={handleChange} placeholder="Guardian Name" className="w-full border p-2" />
          <select name="gender" value={form.gender || ""} onChange={handleChange} className="w-full border p-2">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="w-full border p-2" />
          <input type="text" name="location" value={form.location || ""} onChange={handleChange} placeholder="Location" className="w-full border p-2" />
          <input type="text" name="subjects_interest" value={form.subjects_interest || ""} onChange={handleChange} placeholder="Subjects of Interest (comma-separated)" className="w-full border p-2" />
          <input type="text" name="grade_level" value={form.grade_level || ""} onChange={handleChange} placeholder="Grade Level" className="w-full border p-2" />
          <textarea name="goals" value={form.goals || ""} onChange={handleChange} placeholder="Learning Goals" className="w-full border p-2" />
          <input type="text" name="preferred_languages" value={form.preferred_languages || ""} onChange={handleChange} placeholder="Preferred Languages (comma-separated)" className="w-full border p-2" />
          <input type="text" name="time_slots" value={form.time_slots || ""} onChange={handleChange} placeholder="Time Slots (comma-separated)" className="w-full border p-2" />
          <select name="learning_mode" value={form.learning_mode || ""} onChange={handleChange} className="w-full border p-2">
            <option value="">Select Learning Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <input type="text" name="payment_methods" value={form.payment_methods || ""} onChange={handleChange} placeholder="Payment Methods (comma-separated)" className="w-full border p-2" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      )}
    </div>
  );
};

export default StudentProfile;
