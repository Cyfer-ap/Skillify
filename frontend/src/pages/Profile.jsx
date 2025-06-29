import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setForm(res.data);
        setEditMode(Object.keys(res.data).length <= 1); // auto-enable edit if data is mostly empty
      })
      .catch((err) => {
        console.warn(
          "No profile found or fetch failed. Initializing empty form."
        );
        setEditMode(true);
        setForm({});
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (form[key] !== undefined && form[key] !== null) {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/api/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("✅ Profile saved successfully!");
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Update failed. Check required fields.");
    }
  };

  if (loading) return <div className="loading-state">Loading profile...</div>;

  const isTeacher = profile?.rate !== undefined || form?.rate !== undefined;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">Manage your personal information and preferences</p>
      </div>

      {!editMode && profile ? (
        <div className="profile-display">
          <pre className="profile-json">
            {JSON.stringify(profile, null, 2)}
          </pre>
          <button
            onClick={() => setEditMode(true)}
            className="edit-btn"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <h3 className="section-title">Basic Details</h3>
          
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Gender</label>
              <input
                type="text"
                name="gender"
                value={form.gender || ""}
                onChange={handleChange}
                placeholder="Enter your gender"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob || ""}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Location</label>
              <input
                type="text"
                name="location"
                value={form.location || ""}
                onChange={handleChange}
                placeholder="Enter your location"
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Profile Picture</label>
            <div className="file-input-container">
              <input
                type="file"
                name="profile_picture"
                onChange={handleChange}
                className="file-input"
                accept="image/*"
              />
              <label className="file-input-label">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Choose Profile Picture
              </label>
            </div>
          </div>

          {isTeacher ? (
            <>
              <h3 className="section-title">Professional Information</h3>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Subjects</label>
                  <input
                    type="text"
                    name="subjects"
                    value={form.subjects || ""}
                    onChange={handleChange}
                    placeholder="e.g., Math, Science, English"
                    className="form-input"
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Grade Levels</label>
                  <input
                    type="text"
                    name="grade_levels"
                    value={form.grade_levels || ""}
                    onChange={handleChange}
                    placeholder="e.g., K-12, College"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Languages</label>
                  <input
                    type="text"
                    name="languages"
                    value={form.languages || ""}
                    onChange={handleChange}
                    placeholder="e.g., English, Spanish"
                    className="form-input"
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Hourly Rate ($)</label>
                  <input
                    type="number"
                    name="rate"
                    value={form.rate || ""}
                    onChange={handleChange}
                    placeholder="Enter your hourly rate"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Teaching Mode</label>
                <select
                  name="mode"
                  value={form.mode || ""}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Teaching Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">In-person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Availability Schedule</label>
                <input
                  type="text"
                  name="availability"
                  value={form.availability || ""}
                  onChange={handleChange}
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Experience</label>
                <textarea
                  name="experience"
                  value={form.experience || ""}
                  onChange={handleChange}
                  placeholder="Describe your teaching experience..."
                  className="form-textarea"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Certifications</label>
                <textarea
                  name="certifications"
                  value={form.certifications || ""}
                  onChange={handleChange}
                  placeholder="List your certifications and qualifications..."
                  className="form-textarea"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={handleChange}
                  placeholder="Tell students about yourself..."
                  className="form-textarea"
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="section-title">Learning Preferences</h3>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Guardian Name</label>
                  <input
                    type="text"
                    name="guardian_name"
                    value={form.guardian_name || ""}
                    onChange={handleChange}
                    placeholder="Enter guardian's name"
                    className="form-input"
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Grade Level</label>
                  <input
                    type="text"
                    name="grade_level"
                    value={form.grade_level || ""}
                    onChange={handleChange}
                    placeholder="e.g., 10th Grade"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Subjects of Interest</label>
                <input
                  type="text"
                  name="subjects_interest"
                  value={form.subjects_interest || ""}
                  onChange={handleChange}
                  placeholder="e.g., Math, Physics, Literature"
                  className="form-input"
                />
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Preferred Languages</label>
                  <input
                    type="text"
                    name="preferred_languages"
                    value={form.preferred_languages || ""}
                    onChange={handleChange}
                    placeholder="e.g., English, Spanish"
                    className="form-input"
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Learning Mode</label>
                  <select
                    name="learning_mode"
                    value={form.learning_mode || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Learning Mode</option>
                    <option value="online">Online</option>
                    <option value="offline">In-person</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Preferred Time Slots</label>
                <input
                  type="text"
                  name="time_slots"
                  value={form.time_slots || ""}
                  onChange={handleChange}
                  placeholder="e.g., Weekdays 4-6 PM"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Payment Methods</label>
                <input
                  type="text"
                  name="payment_methods"
                  value={form.payment_methods || ""}
                  onChange={handleChange}
                  placeholder="e.g., Credit Card, PayPal"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Learning Goals</label>
                <textarea
                  name="goals"
                  value={form.goals || ""}
                  onChange={handleChange}
                  placeholder="Describe your learning goals and objectives..."
                  className="form-textarea"
                />
              </div>
            </>
          )}
          
          <button type="submit" className="save-btn">
            Save Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
