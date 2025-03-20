import React, { useState } from 'react';
import axios from 'axios';

const BulkAction = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {                                                                       
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
        } catch (err) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Upload Excel File</h1>
                <label className="block mb-4">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Choose File</span>
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".xlsx"
                            className="hidden"
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-3 text-center"
                        >
                            {file ? file.name : 'Select File'}
                        </label>
                    </div>
                </label>
                <button
                    onClick={handleUpload}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Upload
                </button>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-teal-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BulkAction;
