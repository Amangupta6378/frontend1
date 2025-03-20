import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  if (!student || !student.feeStructure) {
    return <p className="text-red-500 text-center mt-4">⚠ Fee structure not found!</p>;
  }

  const { tuitionFee, hostelFee, miscFee, totalFee, extraFees = [] } = student.feeStructure;

  return (
    <div className="p-6">
      {/* 📌 Header Section */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        {student.studentName} - Fee Structure
      </h1>

      {/* 📌 Main Fee Structure Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-white bg-opacity-70 text-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-left">Component</th>
            <th className="border border-gray-300 px-4 py-2">Fee Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Tuition Fee", amount: tuitionFee },
            { name: "Hostel Fee", amount: hostelFee },
            { name: "Miscellaneous Fee", amount: miscFee },
            { name: "Total Fee", amount: totalFee, isBold: true },
          ].map((fee, index) => (
            <tr key={index} className="text-center">
              <td className={`border border-gray-300 px-4 py-2 text-left ${fee.isBold ? "font-bold" : ""}`}>
                {fee.name}
              </td>
              <td className={`border border-gray-300 px-4 py-2 ${fee.isBold ? "font-bold" : ""}`}>₹{fee.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-4 py-1 rounded-md text-white ${
                    index % 2 === 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  } transition`}
                >
                  {index % 2 === 0 ? "Paid" : "Unpaid"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📌 Additional Fees Section */}
      {extraFees.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Additional Fees</h2>
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-white bg-opacity-70 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">Component</th>
                <th className="border border-gray-300 px-4 py-2">Fee Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {extraFees.map((fee, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2 text-left">{fee.name}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{fee.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className={`px-4 py-1 rounded-md text-white ${
                        index % 2 === 0 ? "bg-green-500  bg-opacity-80 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                      } transition`}
                    >
                      {index % 2 === 0 ? "Paid" : "Unpaid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📌 Edit Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate(`/feecomponent/${student._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Component;

