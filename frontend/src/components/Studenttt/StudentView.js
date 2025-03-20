import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StudentDetail from "./StudentDetail";
import FeeStructure from "./FeeStructure";
import Component from "./Component";

const StudentView = () => {
  const location = useLocation();
  const student = location.state?.student || {};

  const [activeTab, setActiveTab] = useState("StudentDetail"); // Default tab

  return (
    <div className="p-6">
      {/* ✅ Header with Student Name */}
      <h1 className="text-2xl font-semibold mb-4">{student.studentName}</h1>

      {/* ✅ Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {["Fee component", "flex setup", ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/([A-Z])/g, " $1").trim()} {/* Convert camelCase to words */}
          </button>
        ))}
      </div>

      {/* ✅ Render Active Tab */}
      <div className="mt-4">
        {/* {activeTab === "StudentDetail" && <StudentDetail student={student} />} */}
        {activeTab === "Fee component" && <Component student={student} />} {/* ✅ Passing student object */}
        {activeTab === "flex setup" && student && <FeeStructure studentId={student._id} student={student} />}




       
      </div>
    </div>
  );
};

export default StudentView;

