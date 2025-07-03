import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const StudentProfile = () => {
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => {
        console.warn("No profile found or fetch failed.");
        setForm({});
      })
      .finally(() => setLoading(false));
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
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
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

  if (loading) return <div className="loading-text">Loading profile...</div>;

  const isTeacher = form?.rate !== undefined;

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 My Profile</h2>
      {message && <p className="message">{message}</p>}

      {!editMode ? (
        <div>
          <button onClick={() => setEditMode(true)} className="edit-button">
            ✏️ Edit Profile
          </button>
          <div className="card-grid">
            <div className="card">
              <h3>👩‍🎓 Personal Details</h3>
              <p><strong>Full Name:</strong> {form.full_name || "N/A"}</p>
              <p><strong>Gender:</strong> {form.gender || "N/A"}</p>
              <p><strong>DOB:</strong> {form.dob || "N/A"}</p>
              <p><strong>Location:</strong> {form.location || "N/A"}</p>
              <p><strong>Guardian Name:</strong> {form.guardian_name || "N/A"}</p>
            </div>

            <div className="card">
              <h3>📚 {isTeacher ? "Academic Details" : "Learning Preferences"}</h3>
              {isTeacher ? (
                <>
                  <p><strong>Subjects:</strong> {form.subjects || "N/A"}</p>
                  <p><strong>Grade Levels:</strong> {form.grade_levels || "N/A"}</p>
                  <p><strong>Languages:</strong> {form.languages || "N/A"}</p>
                  <p><strong>Rate:</strong> ₹{form.rate || "N/A"}</p>
                  <p><strong>Mode:</strong> {form.mode || "N/A"}</p>
                  <p><strong>Experience:</strong> {form.experience || "N/A"}</p>
                  <p><strong>Certifications:</strong> {form.certifications || "N/A"}</p>
                  <p><strong>Bio:</strong> {form.bio || "N/A"}</p>
                </>
              ) : (
                <>
                  
                  <p><strong>Grade Level:</strong> {form.grade_level || "N/A"}</p>
                  <p><strong>Subjects of Interest:</strong> {form.subjects_interest || "N/A"}</p>
                  <p><strong>Preferred Languages:</strong> {form.preferred_languages || "N/A"}</p>
                  <p><strong>Learning Mode:</strong> {form.learning_mode || "N/A"}</p>
                  <p><strong>Time Slots:</strong> {form.time_slots || "N/A"}</p>
                  <p><strong>Payment Methods:</strong> {form.payment_methods || "N/A"}</p>
                  <p><strong>Goals:</strong> {form.goals || "N/A"}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card-grid">
          <input type="text" name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full Name" className="input-field" />
          <input type="file" name="profile_picture" onChange={handleChange} className="input-field" />
          <input type="text" name="guardian_name" value={form.guardian_name || ""} onChange={handleChange} placeholder="Guardian Name" className="input-field" />
          <select name="gender" value={form.gender || ""} onChange={handleChange} className="input-field">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="input-field" />
          <input type="text" name="location" value={form.location || ""} onChange={handleChange} placeholder="Location" className="input-field" />

          {isTeacher ? (
            <>
              <input type="text" name="subjects" value={form.subjects || ""} onChange={handleChange} placeholder="Subjects" className="input-field" />
              <input type="text" name="grade_levels" value={form.grade_levels || ""} onChange={handleChange} placeholder="Grade Levels" className="input-field" />
              <input type="text" name="languages" value={form.languages || ""} onChange={handleChange} placeholder="Languages" className="input-field" />
              <input type="number" name="rate" value={form.rate || ""} onChange={handleChange} placeholder="Hourly Rate" className="input-field" />
              <select name="mode" value={form.mode || ""} onChange={handleChange} className="input-field">
                <option value="">Teaching Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <textarea name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Experience" className="input-field" />
              <textarea name="certifications" value={form.certifications || ""} onChange={handleChange} placeholder="Certifications" className="input-field" />
              <textarea name="bio" value={form.bio || ""} onChange={handleChange} placeholder="Short Bio" className="input-field" />
            </>
          ) : (
            <>
              <input type="text" name="subjects_interest" value={form.subjects_interest || ""} onChange={handleChange} placeholder="Subjects of Interest" className="input-field" />
              <input type="text" name="grade_level" value={form.grade_level || ""} onChange={handleChange} placeholder="Grade Level" className="input-field" />
              <input type="text" name="preferred_languages" value={form.preferred_languages || ""} onChange={handleChange} placeholder="Preferred Languages" className="input-field" />
              <select name="learning_mode" value={form.learning_mode || ""} onChange={handleChange} className="input-field">
                <option value="">Learning Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <input type="text" name="time_slots" value={form.time_slots || ""} onChange={handleChange} placeholder="Preferred Time Slots" className="input-field" />
              <input type="text" name="payment_methods" value={form.payment_methods || ""} onChange={handleChange} placeholder="Payment Methods" className="input-field" />
              <textarea name="goals" value={form.goals || ""} onChange={handleChange} placeholder="Learning Goals" className="input-field" />
            </>
          )}
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
  );
};

export default StudentProfile;
