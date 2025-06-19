import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 flex space-x-4">
        <Link to="/login" className="text-blue-600">Login</Link>
        <Link to="/register" className="text-green-600">Register</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
