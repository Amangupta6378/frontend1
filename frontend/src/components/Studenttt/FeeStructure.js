import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FeeStructure = ({ studentId: propStudentId, student }) => {
    const { studentId: paramStudentId } = useParams();
    const navigate = useNavigate();
    const studentId = propStudentId || paramStudentId;

    const [totalFee, setTotalFee] = useState(0);
    const [tuitionFee, setTuitionFee] = useState(0);
    const [installments, setInstallments] = useState([]);
    const [numInstallments, setNumInstallments] = useState(4);
    const [startDate, setStartDate] = useState("");
    const [repeatEvery, setRepeatEvery] = useState(3); // Default 3 Months
    const [adjustAmounts, setAdjustAmounts] = useState("Don't Adjust");

    useEffect(() => {
        if (!studentId) return;
        const fetchFeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${studentId}/fees`);
                setTotalFee(response.data.totalFee);
                setTuitionFee(response.data.tuitionFee);
            } catch (error) {
                console.error("Error fetching fee details:", error);
            }
        };
        fetchFeeDetails();
    }, [studentId]);

    // Installments Calculation
    useEffect(() => {
        if (totalFee > 0 && startDate) {
            setInstallments(calculateInstallments(totalFee, numInstallments, startDate, repeatEvery));
        }
    }, [totalFee, numInstallments, startDate, repeatEvery]);

    const calculateInstallments = (totalFee, numInstallments, startDate, repeatEvery) => {
        if (!totalFee || numInstallments < 1 || !startDate) return [];
    
        let baseAmount = Math.floor(totalFee / numInstallments);
        let remainingAmount = totalFee - (baseAmount * numInstallments);
    
        let calculatedInstallments = [];
        let installmentDate = new Date(startDate);
    
        for (let i = 0; i < numInstallments; i++) {
            let finalAmount = baseAmount;
    
            // Last installment me rounding adjust
            if (i === numInstallments - 1) {
                finalAmount += remainingAmount;
            }
    
            calculatedInstallments.push({
                installmentNo: i + 1,
                amount: finalAmount,
                dueDate: new Date(installmentDate).toISOString().split("T")[0], // YYYY-MM-DD format
            });
    
            // Next due date set (Repeat every X months)
            installmentDate.setMonth(installmentDate.getMonth() + repeatEvery);
        }
    
        return calculatedInstallments;
    };
    
    
    // Save installments
    const handleSaveChanges = async () => {
        try {
            await axios.post(`http://localhost:5000/api/students/${studentId}/installments`, { installments });
            navigate("/students");
        } catch (error) {
            console.error("Error saving installments:", error);
        }
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Fee Structure</h2>
            <h2 className="text-xl font-semibold mb-2">Fee Structure for {student.studentName}</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Total Fee:</label>
                <p>{totalFee || "Loading..."}</p>
            </div>

            {/* Installments Count */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Installments: </label>
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={numInstallments}
                    onChange={(e) => setNumInstallments(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Start Date */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Starting From: </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Repeat Every Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Repeat Every:</label>
                <select
                    value={repeatEvery}
                    onChange={(e) => setRepeatEvery(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                    <option value={1}>1 Month</option>
                    <option value={2}>2 Months</option>
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                </select>
            </div>

            {/* Adjust Amounts Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Adjust Amounts:</label>
                <select
                    value={adjustAmounts}
                    onChange={(e) => setAdjustAmounts(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="Don't Adjust">Don't Adjust</option>
                    <option value="Split Equally">Split Equally</option>
                </select>
            </div>

            {/* Calculate Button */}
            <div className="mb-4">
                <button
                    onClick={calculateInstallments}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Calculate Installments
                </button>
            </div>

            {/* Installments Display */}
            <div>
                <h3 className="text-xl font-bold mb-2">Installments</h3>
                <ul>
                {installments.map((installment) => (
                    <li key={installment.installmentNo}>
                        Installment {installment.installmentNo}: ₹{installment.amount} - Due Date: {installment.dueDate}
                    </li>
                ))}
            </ul>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSaveChanges}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            >
                Save Changes
            </button>
        </div>
    );
};

export default FeeStructure;
