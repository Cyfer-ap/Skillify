import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">Register</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" required />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
      <input name="bio" placeholder="Bio" onChange={handleChange} className="border p-2 w-full" />
      <select name="role" onChange={handleChange} className="border p-2 w-full">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <input name="password1" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
      <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;
