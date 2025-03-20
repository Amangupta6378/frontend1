import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentModel = ({ onClose, institutes }) => {
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const navigate = useNavigate(); // Navigation ke liye

    const handleAdd = () => {
        if (!selectedInstitute || selectedInstitute === 'Select Institute') return;
        
        // Navigate to StudentDetail page with selectedInstitute as state
        navigate('/studentdetail', { state: { selectedInstitute } });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Student</h2>

                <label className="block text-sm font-medium mb-2">Select Institute</label>
                <select
                    className="p-2 w-full rounded border border-gray-300 mb-4"
                    value={selectedInstitute}
                    onChange={(e) => setSelectedInstitute(e.target.value)}
                >
                    <option>Select Institute</option>
                    {institutes.map((institute) => (
                        <option key={institute._id} value={institute.name}>
                            {institute.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-between">
                    <button
                        onClick={() => onClose()}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={!selectedInstitute || selectedInstitute === 'Select Institute'}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddStudentModel;

