import React from "react";
import { useNavigate } from "react-router-dom";
import InstituteMain from "../InstituteMain";

const InstituteStudent = () => {
  const navigate = useNavigate();
  const instituteId = localStorage.getItem("instituteId");

  // Function to navigate to add student form
  const handleAddStudent = () => {
    navigate("/studentDetail", { state: { selectedInstitute: instituteId } });
  };

  return (
    <div className="p-6">
      {/* 🟦 Header Section */}
      <div className="relative bg-blue-600 h-20 flex items-center justify-between px-6">
        <h1 className="text-white text-xl font-semibold">Students</h1>
        <button
          className="flex items-center bg-white text-blue-600 px-3 py-2 rounded hover:bg-blue-200 cursor-pointer transition-all duration-300"
          onClick={handleAddStudent}
        >
          <span className="material-icons mr-1">add</span>
          Add Student
        </button>
      </div>

      {/* 📜 Show Student List for Logged-in Institute */}
    
    </div>
  );
};

export default InstituteStudent;
