import React, { useEffect, useState } from "react";
import axios from "axios";

const InstituteDropdown = ({ onSelectInstitute, onSelectDegree, onSelectYear, showDegreeYear = true }) => {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const degrees = ["BTech", "MTech", "BSc", "MSc", "BBA", "MBA", "BCom", "MCom", "PhD"];
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/institutes");
        setInstitutes(response.data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };
    fetchInstitutes();
  }, []);

  useEffect(() => {
    if (onSelectInstitute) onSelectInstitute(selectedInstitute);
    if (onSelectDegree) onSelectDegree(selectedDegree);
    if (onSelectYear) onSelectYear(selectedYear);
  }, [selectedInstitute, selectedDegree, selectedYear]);

  return (
    <div className="flex space-x-4 p-4">
      {/* 🏢 Institute Dropdown */}
      <select
        className="p-2 rounded border border-gray-300 w-60 "
        value={selectedInstitute}
        onChange={(e) => {
          setSelectedInstitute(e.target.value);
          setSelectedDegree(""); 
          setSelectedYear(""); 
        }}
      >
        <option value="">Select Institute</option>
        {institutes.map((institute) => (
          <option key={institute._id} value={institute._id}>
            {institute.name}
          </option>
        ))}
      </select>

      {/* 🎓 Degree & Year Dropdowns (Only if showDegreeYear is true) */}
      {showDegreeYear && (
        <>
          <select
            className="p-2 rounded border border-gray-300 w-40"
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            disabled={!selectedInstitute}
          >
            <option value="">Select Degree</option>
            {degrees.map((degree, index) => (
              <option key={index} value={degree}>
                {degree}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded border border-gray-300 w-40"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={!selectedDegree}
          >
            <option value="">Select Academic Year</option>
            {academicYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default InstituteDropdown;
