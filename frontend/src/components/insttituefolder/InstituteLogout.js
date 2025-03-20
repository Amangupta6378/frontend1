import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InstituteLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove institute session data
    localStorage.removeItem("instituteId");

    // Redirect to login page after 1.5 seconds
    setTimeout(() => {
      navigate("/institute-login");
    }, 1500);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Logging out...</h2>
        <p className="text-gray-500">Redirecting you to the login page.</p>
      </div>
    </div>
  );
};

export default InstituteLogout;
