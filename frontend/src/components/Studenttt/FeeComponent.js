import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const FeeComponent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check if coming from Add Student Page
  const isAddingStudent = location.state?.fromAddStudent || false;

  // ✅ Fee States
  const [student, setStudent] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [hostelFee, setHostelFee] = useState(50000);
  const [miscFee, setMiscFee] = useState(10000);
  const [totalFee, setTotalFee] = useState(0);
  const [extraFees, setExtraFees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  console.log("Student ID from URL:", studentId);

  // ✅ Fetch Student Data
  useEffect(() => {
    if (!studentId) {
      console.error("Error: Student ID is undefined!");
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        const studentData = response.data;
        console.log("Fetched Student Data:", studentData);

        setStudent(studentData);

        if (studentData.feeStructure) {
          setTuitionFee(studentData.feeStructure.tuitionFee || 0);
          setHostelFee(studentData.feeStructure.hostelFee || 50000);
          setMiscFee(studentData.feeStructure.miscFee || 10000);
          setExtraFees(studentData.feeStructure.extraFees || []);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  // ✅ Update Total Fee
  useEffect(() => {
    const extraFeesTotal = extraFees.reduce((sum, fee) => sum + (fee.amount || 0), 0);
    setTotalFee(tuitionFee + hostelFee + miscFee + extraFeesTotal);
  }, [tuitionFee, hostelFee, miscFee, extraFees]);

  // ✅ Add Extra Fee Component
  const addComponent = () => {
    setExtraFees([...extraFees, { name: "", amount: 0 }]);
  };

  // ✅ Handle Extra Fee Input Change
 
  const handleExtraFeeChange = (index, key, value) => {
    const newFees = [...extraFees];
    newFees[index] = {
        ...newFees[index],
        [key]: key === "amount" ? parseFloat(value) || 0 : value,
    };

    console.log("Updated Extra Fees:", newFees); // Debugging ke liye
    setExtraFees(newFees);
};


  // ✅ Save Fee Structure
  
  const handleSubmit = async () => {
    const feeData = {
        tuitionFee: tuitionFee || 0,
        hostelFee: hostelFee || 0,
        miscFee: miscFee || 0,
        totalFee: totalFee || 0,
        extraFees: extraFees.length ? extraFees : [],
    };

    console.log("Submitting Fee Data:", JSON.stringify(feeData, null, 2)); // Debugging ke liye

    try {
        const response = await axios.put(
            `http://localhost:5000/api/students/${studentId}/fees`,
            feeData
        );
        console.log("Fee details updated successfully!", response.data);

        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    } catch (error) {
        console.error(
            "Error updating fee details:",
            error.response ? error.response.data : error
        );
    }
};



  if (!student) return <p>Loading student details...</p>; 
    return (
        <div className="p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
             {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md">
        ← Back
      </button>
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-blue-700">
                    Fee Management for {student.studentName}
                </h2>
                <div className="space-y-1 text-gray-600">
                    <p>Degree: {student.degree}</p>
                    <p>Course: {student.course}</p>
                    <p>Academic Year: {student.academicYear}</p>
                    <p>Roll No: {student.rollNo}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {/* Tuition Fee for Current Semester */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Tuition Fee (Current Semester)</label>
                    <input
                        type="number"
                        value={tuitionFee}
                        onChange={(e) => setTuitionFee(Number(e.target.value))}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Hostel Fee */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Hostel Fee (Current Semester)</label>
                    <input
                        type="number"
                        value={hostelFee}
                        onChange={(e) => setHostelFee(Number(e.target.value))}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Miscellaneous Fee */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Miscellaneous Fee (Current Semester)</label>
                    <input
                        type="number"
                        value={miscFee}
                        onChange={(e) => setMiscFee(Number(e.target.value))}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Dynamically Added Fee Components */}
                <div>
                    <h3 className="text-lg font-medium text-gray-700">Additional Fee Components</h3>
                    {extraFees.map((fee, index) => (
                        <div key={index} className="flex space-x-4 mb-4">
                            <input
                                type="text"
                                placeholder="Fee Name"
                                value={fee.name}
                                onChange={(e) => handleExtraFeeChange(index, 'name', e.target.value)}
                                className="block w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Fee Amount"
                                value={fee.amount}
                                onChange={(e) => handleExtraFeeChange(index, 'amount', Number(e.target.value))}
                                className="block w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <select
                                value={fee.frequency}
                                onChange={(e) => handleExtraFeeChange(index, 'frequency', e.target.value)}
                                className="block w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="One-time">One-time</option>
                                <option value="Every Semester">Every Semester</option>
                            </select>
                        </div>
                    ))}
                </div>

                {/* Add Component Button */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={addComponent}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                        + Add Component
                    </button>
                </div>

                {/* Total Fee for Current Semester */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Total Fee (Current Semester)</label>
                    <input
                        type="number"
                        value={totalFee}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        readOnly
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/students')}
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save Fee Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FeeComponent;