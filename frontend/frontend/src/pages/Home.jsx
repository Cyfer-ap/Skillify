// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-indigo-600">Welcome to Skillify</h1>
      <p className="text-lg mb-6 text-gray-700">
        Real-time 1-on-1 tutoring, instant booking, and collaborative learning tools.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    </div>
  );
};

export default Home;

