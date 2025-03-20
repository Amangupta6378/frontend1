import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailedFeeComponent = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [semesterFees, setSemesterFees] = useState([]);
    const [totalFee, setTotalFee] = useState(0);

    // Fetch student's fee details
    useEffect(() => {
        const fetchFeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${studentId}/fees`);
                setStudent(response.data.student);
                setSemesterFees(response.data.semesterFees); // Fetch all semester-wise fees
                setTotalFee(response.data.totalFee); // Set total fee for all semesters
            } catch (error) {
                console.error('Error fetching fee details:', error);
            }
        };

        fetchFeeDetails();
    }, [studentId]);

    if (!student) return <p>Loading student details...</p>;

    return (
        <div className="p-8 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Detailed Fee Structure</h2>
            
            {/* Student Information */}
            <div className="mb-6 text-gray-600">
                <p>Student Name: {student.studentName}</p>
                <p>Degree: {student.degree}</p>
                <p>Course: {student.course}</p>
                <p>Academic Year: {student.academicYear}</p>
                <p>Roll No: {student.rollNo}</p>
            </div>

            {/* Semester-wise Fee Breakdown */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Semester-wise Fees</h3>
                {semesterFees.map((sem, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <h4 className="text-xl font-bold text-gray-700">Semester {sem.semester}</h4>
                        <ul className="mt-2 text-gray-600 space-y-2">
                            <li>Tuition Fee: ₹{sem.tuitionFee}</li>
                            <li>Hostel Fee: ₹{sem.hostelFee}</li>
                            <li>Miscellaneous Fee: ₹{sem.miscFee}</li>
                            {/* Additional fees for this semester */}
                            {sem.additionalFees.map((extraFee, idx) => (
                                <li key={idx}>
                                    {extraFee.name}: ₹{extraFee.amount}
                                </li>
                            ))}
                            <li className="font-bold mt-2">Total Semester Fee: ₹{sem.totalFee}</li>
                        </ul>
                    </div>
                ))}
            </div>

            {/* Total Fee Breakdown */}
            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <h3 className="text-2xl font-semibold text-gray-700">Total Fee for Full Duration</h3>
                <ul className="mt-2 text-gray-600 space-y-2">
                    <li>Total Tuition Fee (all semesters): ₹{semesterFees.reduce((sum, sem) => sum + sem.tuitionFee, 0)}</li>
                    <li>Total Hostel Fee (all semesters): ₹{semesterFees.reduce((sum, sem) => sum + sem.hostelFee, 0)}</li>
                    <li>Total Miscellaneous Fee: ₹{semesterFees.reduce((sum, sem) => sum + sem.miscFee, 0)}</li>
                    <li>
                        Total Additional Fees: ₹
                        {semesterFees.reduce((sum, sem) => {
                            return sum + sem.additionalFees.reduce((extraSum, fee) => extraSum + fee.amount, 0);
                        }, 0)}
                    </li>
                    <li className="font-bold text-xl mt-4">
                        Total Fee for Full Course: ₹{totalFee}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DetailedFeeComponent;
