import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentDetail = () => {
    const navigate = useNavigate(); // For navigation
    const location = useLocation(); 
    const selectedInstitute = location.state?.selectedInstitute || ""; 
    const [instituteName, setInstituteName] = useState("Loading...");

    const [studentName, setStudentName] = useState('');
    const [degree, setDegree] = useState('');
    const [course, setCourse] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState(''); // Updated
    const [contactEmail, setContactEmail] = useState(''); // Updated

    // Dynamic academic years based on degree
    const getAcademicYears = () => {
        if (degree === 'BTech') {
            return ['2022-2026', '2023-2027', '2024-2028', '2025-2029'];
        } else if (degree === 'MTech') {
            return ['2022-2024', '2023-2025', '2024-2026'];
        } else if (degree === 'MBA') {
            return ['2023-2025', '2024-2026'];
        } else if (degree === 'BCA') {
            return ['2022-2025', '2023-2026'];
        } else if (degree === 'BCom') {
            return ['2022-2025', '2023-2026'];
        } else if (degree === 'MCA') {
            return ['2022-2024', '2023-2025'];
        } else if (degree === 'BBA') {
            return ['2022-2025', '2023-2026'];
        } else if (degree === 'BDS') {
            return ['2022-2027', '2023-2028'];
        } else if (degree === 'MBBS') {
            return ['2022-2027', '2023-2028'];
        } else if (degree === 'BA') {
            return ['2022-2025', '2023-2026'];
        }
        return [];
    };

    // Handle discard action
    const handleDiscard = () => {
        navigate('/students'); // Navigate back to students page
    };

    // Handle form submit (e.g., Add Student)
    // StudentDetail.js


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     // Prepare the student data
    //     const studentData = {
    //         studentName,
    //         degree,
    //         course,
    //         academicYear,
    //         rollNo,
    //         contactName,
    //         contactPhone, // Updated
    //         contactEmail 
    //     };

    //     try {
    //         // Sending the data to the backend
    //         const response = await axios.post('http://localhost:5000/api/students', studentData);
    //         console.log('Student added successfully:', response.data);
    //         navigate('/feecomponent'); // Redirect to students page after success
    //     } catch (error) {
    //         console.error('Error adding student:', error.response ? error.response.data : error.message);
    //     }
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     // Prepare the student data
    //     const studentData = {
    //         studentName,
    //         degree,
    //         course,
    //         academicYear,
    //         rollNo,
    //         contactName,
    //         contactPhone,
    //         contactEmail,
    //         institute: selectedInstitute // 👈 Institute bhi bhejna zaroori hai!
    //     };
    
    //     try {
    //         // Sending the data to the backend to save the student in the database
    //         const response = await axios.post('http://localhost:5000/api/students', studentData);
    //         console.log('Student added successfully:', response.data);
            
    //         // After student is added, get the studentId from the response and redirect
    //         const studentId = response.data.student._id; // Assuming the student is returned with an `_id`
    //         navigate(`/feecomponent/${studentId}`); // Redirect to FeeComponent page with studentId
    //     } catch (error) {
    //         console.error('Error adding student:', error.response ? error.response.data : error.message);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the student data
        const studentData = {
            studentName,
            degree,
            course,
            academicYear,
            rollNo,
            contactName,
            contactPhone,
            contactEmail,
            institute: selectedInstitute // 👈 Yeh institute ab database me jayega
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/students', studentData);
            console.log('Student added successfully:', response.data);
            
            const studentId = response.data.student._id; 
            navigate(`/feecomponent/${studentId}`);
        } catch (error) {
            console.error('Error adding student:', error.response ? error.response.data : error.message);
            if (error.response) {
                console.log("Full error response:", error.response.data); // 👈 Yeh add karo
            }
        }
    };
    // Institute ka naam fetch karna
    useEffect(() => {
        if (selectedInstitute) {
            console.log("Fetching institute:", selectedInstitute); // Debugging
            axios.get(`http://localhost:5000/api/institutes/${selectedInstitute}`)
                .then(response => {
                    setInstituteName(response.data.name);
                })
                .catch(error => {
                    console.error("Error fetching institute name:", error);
                    if (error.response) {
                        console.log("Error response data:", error.response.data);
                    }
                    setInstituteName("Unknown Institute");
                });
        } else {
            console.warn("selectedInstitute is not defined!");
        }
    }, [selectedInstitute]);
    

    return (
        <div className="p-8">
            {/* Back Button */}
            <button
                onClick={() => navigate('/students')}
                className="text-blue-600 mb-4 flex items-center"
            >
                <span className="material-icons mr-2">arrow_back</span>
                Back to Students
            </button>

            <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
              {/* Institute Name Display */}
              <h2 className="text-2xl font-semibold mb-4">Institute Name: {instituteName || "Loading..."}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter student name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Degree</label>
                        <select
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Degree</option>
                            <option value="BTech">BTech</option>
                            <option value="MTech">MTech</option>
                            <option value="MBA">MBA</option>
                            <option value="BCA">BCA</option>
                            <option value="BCom">BCom</option>
                            <option value="MCA">MCA</option>
                            <option value="BBA">BBA</option>
                            <option value="BDS">BDS</option>
                            <option value="MBBS">MBBS</option>
                            <option value="BA">BA</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Course</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                        <select
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Academic Year</option>
                            {getAcademicYears().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Roll No</label>
                        <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Roll Number"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Primary Contact Details</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                            <input
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter contact name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone No</label>
                            <input
                                type="text"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email ID</label>
                            <input
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 4 - Action Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleDiscard}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentDetail;
