import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"; // Optional: for any extra styles

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    role: "student",
    phone: "",
    bio: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(form);
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      console.error(data);
      let errorMsg = "Registration failed.";
      if (data?.non_field_errors) errorMsg = data.non_field_errors[0];
      else if (typeof data === "object") {
        errorMsg = Object.values(data).flat().join(" ");
      }
      setError(errorMsg);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row shadow rounded overflow-hidden w-75" style={{ height: "80vh" }}>
        {/* Left welcome panel */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-4 welcome-bg">
          <h2 className="fw-bold welcome-title">WELCOME</h2>
          <p className="text-center welcome-subtext">Join us today and access all features.</p>
        </div>

        {/* Right form panel */}
        <div className="col-md-6 bg-white p-4 form-container">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
              <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </div>
            <h3 className="mb-2 fw-semibold">Sign up</h3>
            <p className="text-muted small">Create your account below</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-6">
              <input name="username" placeholder="Username" onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-6">
              <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-6">
              <input name="phone" placeholder="Phone" onChange={handleChange} className="form-control" />
            </div>
            <div className="col-6">
              <input name="bio" placeholder="Bio" onChange={handleChange} className="form-control" />
            </div>
            <div className="col-12">
              <select name="role" onChange={handleChange} className="form-select">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="col-6">
              <input name="password1" type="password" placeholder="Password" onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-6">
              <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </div>
            <div className="text-center mt-4 small">
              Already have an account? <Link to="/login" className="text-primary">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
