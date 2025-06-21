import { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p className="p-4">Loading profile...</p>;

  const isTeacher = profile?.rate !== undefined || form?.rate !== undefined;

  return (
    <div
      style={{
        padding: "20px",
        margin: "0 auto",
        display: "block",
      }}
    >
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {!editMode && profile ? (
        <>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
            {JSON.stringify(profile, null, 2)}
          </pre>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "600px",
          }}
        >
          <h3 className="text-lg font-semibold">Basic Details</h3>
          <input
            type="text"
            name="full_name"
            value={form.full_name || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="input"
          />
          <input type="file" name="profile_picture" onChange={handleChange} />
          <input
            type="text"
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            placeholder="Gender"
            className="input"
          />
          <input
            type="date"
            name="dob"
            value={form.dob || ""}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            placeholder="Location"
            className="input"
          />
          {isTeacher ? (
            <>
              <h3 className="text-lg font-semibold">Professional Info</h3>
              <input
                type="text"
                name="subjects"
                value={form.subjects || ""}
                onChange={handleChange}
                placeholder="Subjects (comma-separated)"
                className="input"
              />
              <input
                type="text"
                name="grade_levels"
                value={form.grade_levels || ""}
                onChange={handleChange}
                placeholder="Grade Levels"
                className="input"
              />
              <input
                type="text"
                name="languages"
                value={form.languages || ""}
                onChange={handleChange}
                placeholder="Languages"
                className="input"
              />
              <textarea
                name="experience"
                value={form.experience || ""}
                onChange={handleChange}
                placeholder="Experience"
                className="input"
              />
              <textarea
                name="certifications"
                value={form.certifications || ""}
                onChange={handleChange}
                placeholder="Certifications"
                className="input"
              />
              <input
                type="text"
                name="availability"
                value={form.availability || ""}
                onChange={handleChange}
                placeholder="Availability Schedule"
                className="input"
              />
              <input
                type="number"
                name="rate"
                value={form.rate || ""}
                onChange={handleChange}
                placeholder="Hourly Rate"
                className="input"
              />
              <select
                name="mode"
                value={form.mode || ""}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Mode</option>
                <option value="online">Online</option>
                <option value="offline">In-person</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
                className="input"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">Learning Preferences</h3>
              <input
                type="text"
                name="guardian_name"
                value={form.guardian_name || ""}
                onChange={handleChange}
                placeholder="Guardian Name"
                className="input"
              />
              <input
                type="text"
                name="subjects_interest"
                value={form.subjects_interest || ""}
                onChange={handleChange}
                placeholder="Subjects of Interest"
                className="input"
              />
              <input
                type="text"
                name="grade_level"
                value={form.grade_level || ""}
                onChange={handleChange}
                placeholder="Grade Level"
                className="input"
              />
              <textarea
                name="goals"
                value={form.goals || ""}
                onChange={handleChange}
                placeholder="Learning Goals"
                className="input"
              />
              <input
                type="text"
                name="preferred_languages"
                value={form.preferred_languages || ""}
                onChange={handleChange}
                placeholder="Preferred Languages"
                className="input"
              />
              <input
                type="text"
                name="time_slots"
                value={form.time_slots || ""}
                onChange={handleChange}
                placeholder="Preferred Time Slots"
                className="input"
              />
              <select
                name="learning_mode"
                value={form.learning_mode || ""}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Mode</option>
                <option value="online">Online</option>
                <option value="offline">In-person</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <input
                type="text"
                name="payment_methods"
                value={form.payment_methods || ""}
                onChange={handleChange}
                placeholder="Payment Methods"
                className="input"
              />
            </>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
