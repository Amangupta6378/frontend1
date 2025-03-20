import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsttituteLogin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/institutes/login', { name, password });

            if (response.data.success) {
                localStorage.setItem('instituteToken', response.data.token);  // Store token
                localStorage.setItem('instituteId', response.data.instituteId); // Store Institute ID
                navigate('/institute-Main');  // Redirect to InstituteMain
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Error logging in');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Institute Login</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleLogin} className="w-80">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Institute Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default InsttituteLogin;


