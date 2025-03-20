import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentList = ({ instituteId, selectedDegree, selectedYear, limitedView = false }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!instituteId) return;

    setStudents([]);
    setLoading(true);
    setError(null);

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
        console.log("API Response:", data);
        const studentsWithStatus = data.map(student => ({
          ...student,
          paymentStatus: Math.random() < 0.5 ? "Success" : "Unpaid", // 🔥 Random Status
        }));
        setStudents(studentsWithStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError(error.message.includes("No students found") ? null : error.message);
        setStudents([]);
        setLoading(false);
      });
  }, [instituteId, selectedDegree, selectedYear]);

  const filteredStudents = students.filter((student) => {
    return (
      (selectedDegree ? student.degree === selectedDegree : true) &&
      (selectedYear ? student.academicYear === selectedYear : true)
    );
  });

  const handleViewStudent = (student) => {
    console.log("View clicked for student:", student);
    navigate(`/student/${student._id}`, { state: { student } });
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Student List</h2>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-500">⚠ {error}</p>
      ) : filteredStudents.length === 0 ? (
        <p>No students found for this selection.</p>
      ) : (
        <div className="overflow-auto max-h-[500px] rounded-lg shadow-lg border border-gray-300">
          {/* This wrapper gives the table its own scroll bar */}
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-300 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Degree</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Academic Year</th>
                {limitedView && <th className="border border-gray-300 px-4 py-2 text-center">Payment Status</th>}
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">{student.studentName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{student.degree}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{student.academicYear}</td>
                  
                  {limitedView && (
                   <td className="border border-gray-300 px-4 py-2 text-center">
                   <span
                     className={`px-4 py-1 rounded-lg font-semibold ${
                       student.paymentStatus === "Success"
                         ? "bg-blue-100 text-blue-500 hover:bg-blue-200" // 🔵 Success = Light Blue
                         : "bg-red-100 text-red-700 hover:bg-red-200" // 🔴 Unpaid = Light Red
                     } transition cursor-pointer`}
                   >
                     {student.paymentStatus}
                   </span>
                 </td>
                 
                  )}

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewStudent(student)}
                      className="bg-green-100 text-green-700 px-4 py-1 rounded-lg font-semibold hover:bg-green-200 transition"
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
  );
};

export default StudentList;





