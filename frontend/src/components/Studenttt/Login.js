import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // 🔄 Page change karne ke liye

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role); // 🔥 Role ko store karo
    
    if (role === "institute") {
      navigate("/institute-main"); // 🔄 Institute ke liye redirect
    } else {
      navigate("/"); // 🔄 Admin ke liye redirect
    }

    window.location.reload(); // Sidebar ko update karne ke liye
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <button
        onClick={() => handleLogin("admin")}
        className="bg-blue-500 text-white px-6 py-2 rounded mb-3"
      >
        Admin Login
      </button>

      <button
        onClick={() => handleLogin("institute")}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Institute Login
      </button>
    </div>
  );
};

export default Login;
