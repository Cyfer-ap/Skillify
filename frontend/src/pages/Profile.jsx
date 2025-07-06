import { useEffect, useState, useCallback, useMemo } from "react";

const StudentProfile = () => {
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Use in-memory storage instead of localStorage for Claude artifacts
  const [token] = useState("demo_token"); // Replace with your auth logic

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    // Simulate API call with demo data
    setTimeout(() => {
      setForm({
        full_name: "John Doe",
        gender: "Male",
        dob: "1995-05-15",
        location: "New York, NY",
        guardian_name: "Jane Doe",
        grade_level: "12th Grade",
        subjects_interest: "Mathematics, Physics, Computer Science",
        preferred_languages: "English, Spanish",
        learning_mode: "hybrid",
        time_slots: "Evening (6-9 PM)",
        payment_methods: "Credit Card, PayPal",
        goals: "Improve in calculus and prepare for college entrance exams"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage("");

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("✅ Profile updated successfully!");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Update failed. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  }, []);

  const isTeacher = useMemo(() => form?.rate !== undefined, [form?.rate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-16 w-8 h-8 bg-emerald-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '3s'}}></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Profile
            </span>
          </h1>
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-gray-700 animate-pulse">
            <span className="text-4xl">👤</span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`max-w-md mx-auto mb-8 p-4 rounded-2xl border text-center transition-all duration-300 ${
            message.includes('✅') 
              ? 'bg-emerald-900/30 border-emerald-400 text-emerald-400' 
              : 'bg-red-900/30 border-red-400 text-red-400'
          }`}>
            {message}
          </div>
        )}

        {!editMode ? (
          <div className="space-y-8">
            {/* Edit Button */}
            <div className="text-center">
              <button
                onClick={() => setEditMode(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 justify-center mx-auto focus:outline-none focus:ring-2 focus:ring-cyan-400 relative overflow-hidden group"
              >
                <span className="relative z-10">✏️ Edit Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Profile Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Details Card */}
              <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`} style={{transitionDelay: '200ms'}}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center border border-gray-700 group-hover:animate-pulse">
                    <span className="text-2xl">👩‍🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Personal Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 mb-1">Full Name</span>
                    <span className="text-lg text-white">{form.full_name || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 mb-1">Gender</span>
                    <span className="text-lg text-white">{form.gender || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 mb-1">Date of Birth</span>
                    <span className="text-lg text-white">{form.dob || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 mb-1">Location</span>
                    <span className="text-lg text-white">{form.location || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Academic Details Card */}
              <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`} style={{transitionDelay: '400ms'}}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full flex items-center justify-center border border-gray-700 group-hover:animate-pulse">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {isTeacher ? 'Teaching Details' : 'Academic Details'}
                  </h3>
                </div>
                <div className="space-y-4">
                  {isTeacher ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Subjects</span>
                        <span className="text-lg text-white">{form.subjects || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Grade Levels</span>
                        <span className="text-lg text-white">{form.grade_levels || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Rate</span>
                        <span className="text-lg text-white">₹{form.rate || "N/A"}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Guardian Name</span>
                        <span className="text-lg text-white">{form.guardian_name || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Grade Level</span>
                        <span className="text-lg text-white">{form.grade_level || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Subjects of Interest</span>
                        <span className="text-lg text-white">{form.subjects_interest || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">Preferred Languages</span>
                        <span className="text-lg text-white">{form.preferred_languages || "N/A"}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details Card - Full Width */}
            <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{transitionDelay: '600ms'}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full flex items-center justify-center border border-gray-700 group-hover:animate-pulse">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Learning Preferences
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1">Learning Mode</span>
                  <span className="text-lg text-white capitalize">{form.learning_mode || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1">Time Slots</span>
                  <span className="text-lg text-white">{form.time_slots || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1">Payment Methods</span>
                  <span className="text-lg text-white">{form.payment_methods || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1">Goals</span>
                  <span className="text-lg text-white">{form.goals || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Edit Profile
                </h2>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={form.full_name || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={form.gender || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location || ""}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="profile_picture"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                />
              </div>

              {/* Student-specific fields */}
              {!isTeacher && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Guardian Name</label>
                      <input
                        type="text"
                        name="guardian_name"
                        value={form.guardian_name || ""}
                        onChange={handleChange}
                        placeholder="Enter guardian name"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Grade Level</label>
                      <input
                        type="text"
                        name="grade_level"
                        value={form.grade_level || ""}
                        onChange={handleChange}
                        placeholder="Enter grade level"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Subjects of Interest</label>
                    <input
                      type="text"
                      name="subjects_interest"
                      value={form.subjects_interest || ""}
                      onChange={handleChange}
                      placeholder="Enter subjects (comma-separated)"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preferred Languages</label>
                      <input
                        type="text"
                        name="preferred_languages"
                        value={form.preferred_languages || ""}
                        onChange={handleChange}
                        placeholder="Enter preferred languages"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Learning Mode</label>
                      <select
                        name="learning_mode"
                        value={form.learning_mode || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      >
                        <option value="">Select Learning Mode</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Preferred Time Slots</label>
                      <input
                        type="text"
                        name="time_slots"
                        value={form.time_slots || ""}
                        onChange={handleChange}
                        placeholder="Enter preferred time slots"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Payment Methods</label>
                      <input
                        type="text"
                        name="payment_methods"
                        value={form.payment_methods || ""}
                        onChange={handleChange}
                        placeholder="Enter payment methods"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Learning Goals</label>
                    <textarea
                      name="goals"
                      value={form.goals || ""}
                      onChange={handleChange}
                      placeholder="Describe your learning goals..."
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden group"
                >
                  <span className="relative z-10">💾 Save Profile</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentProfile;