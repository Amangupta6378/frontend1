import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstituteStudent from "./insttituefolder/InstituteStudent";

const InstituteMain = ({ hideHeader = false, showPaymentStatus = false }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get instituteId from localStorage
  const instituteId = localStorage.getItem("instituteId");

  useEffect(() => {
    if (!instituteId) {
      setError("No Institute ID found. Please login again.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/students/institute/${instituteId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || `HTTP error! Status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        // Assign random "Success" or "Unpaid" status
        const studentsWithStatus = data.map((student) => ({
          ...student,
          paymentStatus: Math.random() < 0.5 ? "Success" : "Unpaid",
        }));

        setStudents(studentsWithStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [instituteId]);

  return (
    <div className="p-2">
      {/* 🔷 Conditionally Render Header */}
      {!hideHeader && <InstituteStudent />}

      {/* 🔷 Student List Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Student List</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="text-red-500">⚠ {error}</p>
        ) : students.length === 0 ? (
          <p>No students found for this institute.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-white bg-opacity-70 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Degree</th>
                  <th className="border border-gray-300 px-4 py-2">Academic Year</th>
                  
                  {/* 🔥 Conditionally Show Payment Status */}
                  {showPaymentStatus && (
                    <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                  )}

                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{student.studentName}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.degree}</td>
                    <td className="border border-gray-300 px-4 py-2">{student.academicYear}</td>

                    {/* 🔥 Conditionally Show Payment Status */}
                    {showPaymentStatus && (
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            student.paymentStatus === "Success" ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {student.paymentStatus}
                        </span>
                      </td>
                    )}

                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                        onClick={() => navigate("/student/view", { state: { student } })}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteMain;
