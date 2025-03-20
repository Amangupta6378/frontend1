import React, { useState, useEffect } from "react";
import axios from "axios";
import InstituteDropdown from "./InstituteDropdown";

const Flex = () => {
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedInstitute) return;

    setLoading(true);
    setError(null);
    setStudents([]);

    axios
      .get(`http://localhost:5000/api/students/institute/${selectedInstitute}`)
      .then((res) => {
        const filteredStudents = res.data.filter(
          (student) => student.installments && student.installments.length > 0
        );
        setStudents(filteredStudents);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch students.");
        setLoading(false);
      });
  }, [selectedInstitute]);

  return (
    <div className="p-6">
      {/* Styled Page Title */}
      <div className="bg-gray-300 text-gray-800 text-xl font-semibold px-6 py-3 rounded-lg inline-block shadow-md">
        Installment Students
      </div>

      {/* Institute Dropdown */}
      <div className="mt-4">
        <InstituteDropdown onSelectInstitute={setSelectedInstitute} />
      </div>

      {/* Student List */}
      {loading ? (
        <p className="mt-4">Loading students...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">⚠ {error}</p>
      ) : students.length === 0 ? (
        <p className="mt-4">No students found with installments.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg shadow-md border border-gray-300 max-w-3xl mx-auto">
          <table className="w-full border-collapse bg-white table-fixed">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-center w-1/3">
                  Name
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center w-1/3">
                  Degree
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {student.studentName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {student.degree}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Flex;
