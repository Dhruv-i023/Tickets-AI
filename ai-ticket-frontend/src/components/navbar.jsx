import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Section (Logo) */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Tickets<span className="text-gray-800">AI</span>
        </Link>

        {/* Right Section (Links) */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-600 font-medium">
                Hi, <span className="text-indigo-600">{user?.username}</span>
              </p>
              {user && user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
