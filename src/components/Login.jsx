// src/components/Login.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && navigate("/");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  // Close on background click
  const handleBackgroundClick = (e) => {
    if (e.target.id === "login-overlay") navigate("/");
  };

  return (
    <div
      id="login-overlay"
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-all"
    >
      <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl border-t-4 border-green-500 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Login to ExtraMart
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
