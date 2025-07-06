import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { loginUser } from "../api/api";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      const payload = JSON.parse(atob(res.data.access.split(".")[1]));
      if (payload.role === "student") navigate("/student/dashboard");
      else if (payload.role === "teacher") navigate("/teacher/dashboard");
      else navigate("/");
    } catch (err) {
      const data = err.response?.data;
      let msg = "Login failed.";
      if (data?.detail) msg = data.detail;
      setError(msg);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box d-flex rounded shadow-lg overflow-hidden">
        {/* Left Welcome Panel */}
        <div className="left-panel d-flex flex-column justify-content-center align-items-center text-white p-4">
          <h2 className="fw-bold">WELCOME</h2>
          <p className="text-center">
            To Skillify<br />
            A Platform to Enhance Your Skills .
          </p>
        </div>

        {/* Right Login Form */}
        <div className="right-panel bg-white p-5">
          <h3 className="mb-3 fw-semibold">Sign in</h3>
          <p className="text-muted small">Enter your credentials to access your account</p>
          {error && <div className="alert alert-danger py-1">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="User Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <small className="position-absolute top-50 end-0 translate-middle-y pe-3 text-primary" style={{ cursor: "pointer" }}>
                SHOW
              </small>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input type="checkbox" className="form-check-input me-2" id="remember" />
                <label htmlFor="remember" className="form-check-label">Remember me</label>
              </div>
              <a href="#" className="text-decoration-none small">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-2">Sign in</button>

            <div className="text-center my-2 text-muted">or</div>

            <button type="button" className="btn btn-outline-secondary w-100">Sign in with other</button>

            <div className="text-center mt-3 small">
              Don’t have an account? <Link to="/register" className="text-primary">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
