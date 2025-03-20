import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteInstallment = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get instituteId from localStorage
  const instituteId = localStorage.getItem("instituteId");

  useEffect(() => {
    if (!instituteId) {
      setError("No Institute ID found. Please login again.");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/students/institute/${instituteId}`)
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
  }, [instituteId]);

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold mb-4">Students with Installments</h1>

      {/* Student List */}
      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">⚠ {error}</p>
      ) : students.length === 0 ? (
        <p>No students have taken installments.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-lg mt-4">
          <thead>
            <tr className="bg-white bg-opacity-70 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Degree</th>
              <th className="border border-gray-300 px-4 py-2">Total Installments</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{student.studentName}</td>
                <td className="border border-gray-300 px-4 py-2">{student.degree}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{student.installments.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InstituteInstallment;
