import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentList from "./Studenttt/StudentList";
import InstituteDropdown from "./Studenttt/InstituteDropdown";

const Student = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  // Handle selections
  const onSelectInstitute = (institute) => {
    setSelectedInstitute(institute);
  };
  const onSelectDegree = (degree) => {
    setSelectedDegree(degree);
  };
  const onSelectYear = (year) => {
    setSelectedYear(year);
  };

  // Open Add Student Modal
  const handleAddStudent = () => {
    setModalOpen(true);
  };

  // Handle Modal Submission
  const handleModalSubmit = () => {
    if (!selectedInstitute) {
      alert("Please select an institute");
      return;
    }
    setModalOpen(false);
    navigate("/studentDetail", { state: { selectedInstitute } });
  };

  return (
    <div className="p-6">
      {/* 🟦 Header Section */}
      <div className="relative bg-gray-800 h-20 flex items-center justify-between px-6">
        <h1 className="text-white text-xl font-semibold">Students</h1>
        <button
          className="flex items-center bg-gray-500 text-white px-3 py-2 rounded hover:bg-blue-200 cursor-pointer transition-all duration-300"
          onClick={handleAddStudent}
        >
          <span className="material-icons mr-1">add</span>
          Add Student
        </button>
      </div>

      {/* 🟢 Dropdowns for Main Page */}
      <div className="mt-4">
        <InstituteDropdown
          onSelectInstitute={onSelectInstitute}
          onSelectDegree={onSelectDegree}
          onSelectYear={onSelectYear}
        />
      </div>

      {/* 📜 Student List */}
      {selectedInstitute && <StudentList instituteId={selectedInstitute} selectedDegree={selectedDegree} selectedYear={selectedYear} />}

    {/* 🏢 Modal - Only Institute Dropdown */}
{/* 🏢 Modal - Only Institute Dropdown */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"
      onClick={() => setModalOpen(false)}
    ></div>

    <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
      <h2 className="text-lg font-semibold mb-4">Add Student</h2>

      {/* ✅ Only Institute Dropdown in Modal */}
      <label className="block mb-2">
        Institute
        <InstituteDropdown onSelectInstitute={onSelectInstitute} showDegreeYear={false} />
      </label>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleModalSubmit}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Student;


