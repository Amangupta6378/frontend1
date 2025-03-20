import React, { useState } from "react";
import InstituteDropdown from "./Studenttt/InstituteDropdown";
import StudentList from "./Studenttt/StudentList";


const Payment = () => {
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div className="p-6">
      {/* 🔹 Page Title */}
      <h1 className="text-2xl font-semibold mb-4">Payments</h1>

      {/* 🔹 Institute Dropdown */}
      <InstituteDropdown
        onSelectInstitute={setSelectedInstitute}
        onSelectDegree={setSelectedDegree}
        onSelectYear={setSelectedYear}
        showDegreeYear={true}
      />

      {/* 🔹 Reusing Student List */}
      <StudentList
        instituteId={selectedInstitute}
        selectedDegree={selectedDegree}
        selectedYear={selectedYear}
        limitedView={true} 
      />
    </div>
  );
};

export default Payment;



