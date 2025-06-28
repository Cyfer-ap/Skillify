import { useEffect, useState } from "react";
import axios from "axios";

const TeacherProfile = () => {
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/teacher/", {
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
      const res = await axios.put("http://127.0.0.1:8000/api/profile/teacher/", formData, {
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
      <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
      {message && <p className="text-sm mb-2 text-red-600">{message}</p>}

      {!editMode ? (
        <div>
          <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Edit Profile
          </button>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Full Name:</strong> {form.full_name || "N/A"}</p>
            <p><strong>Gender:</strong> {form.gender || "N/A"}</p>
            <p><strong>DOB:</strong> {form.dob || "N/A"}</p>
            <p><strong>Location:</strong> {form.location || "N/A"}</p>
            <p><strong>Subjects:</strong> {form.subjects || "N/A"}</p>
            <p><strong>Languages:</strong> {form.languages || "N/A"}</p>
            <p><strong>Experience:</strong> {form.experience || "N/A"}</p>
            <p><strong>Certifications:</strong> {form.certifications || "N/A"}</p>
            <p><strong>Teaching Mode:</strong> {form.mode || "N/A"}</p>
            <p><strong>Rate:</strong> ₹{form.rate || "N/A"}</p>
            <p><strong>Instant Booking:</strong> {form.instant_booking ? "Yes" : "No"}</p>
            <p><strong>Materials Provided:</strong> {form.materials_provided ? "Yes" : "No"}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full Name" className="w-full border p-2" />
          <select name="gender" value={form.gender || ""} onChange={handleChange} className="w-full border p-2">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="w-full border p-2"/>
          <input type="text" name="location" value={form.location || ""} onChange={handleChange} placeholder="Location" className="w-full border p-2" />
          <input type="text" name="subjects" value={form.subjects || ""} onChange={handleChange} placeholder="Subjects (comma-separated)" className="w-full border p-2" />
          <input type="text" name="languages" value={form.languages || ""} onChange={handleChange} placeholder="Languages (comma-separated)" className="w-full border p-2" />
          <input type="number" name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Years of Experience" className="w-full border p-2" />
          <textarea name="certifications" value={form.certifications || ""} onChange={handleChange} placeholder="Certifications" className="w-full border p-2" />
          <select name="mode" value={form.mode || ""} onChange={handleChange} className="w-full border p-2">
            <option value="">Teaching Mode</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>
          <input type="number" name="rate" value={form.rate || ""} onChange={handleChange} placeholder="Rate (₹)" className="w-full border p-2" />
          <label><input type="checkbox" name="instant_booking" checked={form.instant_booking || false} onChange={handleChange} /> Instant Booking</label><br />
          <label><input type="checkbox" name="materials_provided" checked={form.materials_provided || false} onChange={handleChange} /> Materials Provided</label>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      )}
    </div>
  );
};

export default TeacherProfile;

