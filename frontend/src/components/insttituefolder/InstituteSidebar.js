import React from "react";
import { NavLink } from "react-router-dom";

const InstituteSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-6">Institute Panel</h2>

        <div className="mb-4">
          <NavLink
            to="/institute-main"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
            }
          >
            <span className="material-icons mr-2">dashboard</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/institute-main/institute-payments"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
            }
          >
            <span className="material-icons mr-2">account_balance</span>
            Payments
          </NavLink>

          <NavLink
            to="/institute-main/institute-installment"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
            }
          >
            <span className="material-icons mr-2">assignment</span>
            Flex
          </NavLink>
        </div>
      </div>

      {/* Logout Button (Moved to Bottom with Margin) */}
      <div className="mt-auto mb-4">
        <NavLink
          to="/institute-main/institute-logout"
          className={({ isActive }) =>
            `flex items-center p-3 rounded ${isActive ? "bg-red-600" : "hover:bg-red-500"}`
          }
        >
          <span className="material-icons mr-2">logout</span>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default InstituteSidebar;


