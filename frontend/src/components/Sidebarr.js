import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebarr = () => {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
                
                <div className="mb-4">
                    <NavLink 
                        to="/students"
                        className={({ isActive }) => 
                            `flex items-center p-3 mb-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                        }
                    >
                        <span className="material-icons mr-2">person</span>
                        Student
                    </NavLink>

                    <NavLink 
                        to="/payments"
                        className={({ isActive }) => 
                            `flex items-center p-3 mb-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                        }
                    >
                        <span className="material-icons mr-2">attach_money</span>
                        Payments
                    </NavLink>

                    <NavLink 
                        to="/flex"
                        className={({ isActive }) => 
                            `flex items-center p-3 mb-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                        }
                    >
                        <span className="material-icons mr-2">event_repeat</span>
                        Flex
                    </NavLink>
                </div>

                <h3 className="text-sm font-semibold mb-2">Pay Methods</h3>
            </div>

            <div>
                <button className="flex items-center p-3 mb-2 rounded hover:bg-gray-600">
                    <span className="material-icons mr-2">nightlight_round</span>
                    Dark Mode
                </button>
                <button className="flex items-center p-3 rounded hover:bg-gray-600">
                    <span className="material-icons mr-2">person</span>
                    Manage Users
                </button>
            </div>
        </div>
    );
};

export default Sidebarr;
