import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

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
      console.error(data);
      let msg = "Login failed.";
      if (data?.detail) msg = data.detail;
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
