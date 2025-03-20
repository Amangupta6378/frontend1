// SelectInstitute.js
import React, { useState } from 'react';

const institutes = [
    'Institute A',
    'Institute B',
    'Institute C',
    'Institute D',
    'Institute E',
    'Institute F',
    // Add more institutes as needed
];

const SelectInstitutre = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredInstitutes = institutes.filter(institute =>
        institute.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">Select Institute</h1>
            <div className="bg-white shadow rounded p-4 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="bg-white shadow rounded max-h-60 overflow-y-auto">
                <ul>
                    {filteredInstitutes.map((institute, index) => (
                        <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                            {institute}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectInstitutre;
