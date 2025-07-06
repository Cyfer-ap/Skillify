import { useEffect, useState } from "react";
import axios from "axios";
import './TeacherProfile.css';

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
  <div className="teacher-profile">
    <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">👩‍🏫 Teacher Profile</h2>

    {message && <p className="message">{message}</p>}

    <div>
      {!editMode ? (
        
          <div>
            <button
              onClick={() => setEditMode(true)}
              className="edit-button"
            >
              ✏️ Edit Profile
            </button>
          
          <div className="card-grid">
  {/* Personal Info Card */}
  <div className="card">
    <h3>
      <span>👤</span> Personal Information
    </h3>
    <ul className="space-y-2">
      <li><strong>Full Name:</strong> {form.full_name || "N/A"}</li>
      <li><strong>Gender:</strong> {form.gender || "N/A"}</li>
      <li><strong>DOB:</strong> {form.dob || "N/A"}</li>
      <li><strong>Location:</strong> {form.location || "N/A"}</li>
      <li><strong>Languages:</strong> {form.languages || "N/A"}</li>
    </ul>
  </div>

  {/* Teaching Info Card */}
  <div className="card">
    <h3>
      <span>📚</span> Teaching Details
    </h3>
    <ul>
      <li><strong>Subjects:</strong> {form.subjects || "N/A"}</li>
      <li><strong>Experience:</strong> {form.experience || "N/A"} years</li>
      <li><strong>Certifications:</strong> {form.certifications || "N/A"}</li>
      <li><strong>Teaching Mode:</strong> {form.mode || "N/A"}</li>
      <li><strong>Rate:</strong> ₹{form.rate || "N/A"}</li>
      <li><strong>Instant Booking:</strong> {form.instant_booking ? "Yes" : "No"}</li>
      <li><strong>Materials Provided:</strong> {form.materials_provided ? "Yes" : "No"}</li>
    </ul>
  </div>
</div>

        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card-grid">
          <input type="text" name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full Name" className="input-field" />
          
          <select name="gender" value={form.gender || ""} onChange={handleChange} className="input-field">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>

          <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="input-field" />
          <input type="text" name="location" value={form.location || ""} onChange={handleChange} placeholder="Location" className="input-field" />
          <input type="text" name="subjects" value={form.subjects || ""} onChange={handleChange} placeholder="Subjects (comma-separated)" className="input-field" />
          <input type="text" name="languages" value={form.languages || ""} onChange={handleChange} placeholder="Languages (comma-separated)" className="input-field" />
          <input type="number" name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Years of Experience" className="input-field" />
          <textarea name="certifications" value={form.certifications || ""} onChange={handleChange} placeholder="Certifications" className="input-field" />

          <select name="mode" value={form.mode || ""} onChange={handleChange} className="input-field">
            <option value="">Teaching Mode</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>
          <input type="number" name="rate" value={form.rate || ""} onChange={handleChange} placeholder="Rate (₹)" className="input-field" />

         <div className="checkbox-group">
  <label className="checkbox-item">
    <input type="checkbox" name="instant_booking" checked={form.instant_booking || false} onChange={handleChange} />
    <span>Instant Booking</span>
  </label>

  <label className="checkbox-item">
    <input type="checkbox" name="materials_provided" checked={form.materials_provided || false} onChange={handleChange} />
    <span>Materials Provided</span>
  </label>
</div>

            <div className="button-group">
              <button type="submit" className="button-save">
                ✅ Save
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="button-cancel">
                ❌ Cancel
              </button>
            </div>
          
        </form>
      )}
    </div>
  </div>
);
}


export default TeacherProfile;

