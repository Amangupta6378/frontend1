import { useState } from "react";
import axios from "axios";
import { FaSearch, FaEnvelope, FaWhatsapp, FaRupeeSign, FaSpinner, FaCalendar } from "react-icons/fa";

const PaymentForm = () => {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFindStudent = async () => {
    setMessage("Searching...");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/${studentIdInput.trim()}`
      );
      const student = response.data;
      console.log("Student Data:", student); // Debugging log
      console.log("Fee Structure:", student.feeStructure); // Debugging log
      console.log("Installments:", student.feeStructure?.installments); // Debugging log

      setSelectedStudent(student);
      setEmail(student.contactEmail);
      setPhone(student.contactPhone);

      // Get the first installment
      const firstInstallment = student.feeStructure?.installments?.[0];
      if (firstInstallment) {
        setAmount(firstInstallment.amount); // Set the amount
        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(firstInstallment.dueDate).toISOString().split("T")[0];
        setInstallmentDate(formattedDate); // Set the formatted installment date
      } else {
        setAmount(""); // If no installments are available, set amount to empty
        setInstallmentDate(""); // Set installment date to empty
      }

      setMessage("✅ Student Found");
    } catch (error) {
      console.error("Error fetching student:", error);
      setSelectedStudent(null);
      setMessage("❌ Student not found!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/create-payment-link",
        { email, phone, amount, installmentDate }
      );

      if (response.data.success) {
        setMessage(`✅ Payment link sent to ${email} and WhatsApp: +91${phone}`);
      } else {
        setMessage("❌ Failed to send payment link.");
      }
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Send Payment Link
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student ID */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Enter Student ID:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter student ID"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleFindStudent}
              disabled={isLoading}
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSearch className="mr-2" />
              )}
              Find Student
            </button>
          </div>
        </div>

        {/* Auto-filled fields */}
        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaEnvelope className="mr-2 text-blue-500" /> Email:
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp Number:
          </label>
          <input
            type="tel"
            value={phone}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaRupeeSign className="mr-2 text-yellow-500" /> Amount (INR):
          </label>
          <input
            type="number"
            value={amount}
            readOnly // Make the amount field read-only
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaCalendar className="mr-2 text-purple-500" /> Installment Date:
          </label>
          <input
            type="text"
            value={installmentDate}
            readOnly // Make the date field read-only
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          disabled={!amount || isLoading}
          className={`w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center transition-all duration-300 ${
            amount
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Send Payment Link"
          )}
        </button>
      </form>

      {message && (
        <p
          className={`mt-6 text-center font-semibold ${
            message.startsWith("✅")
              ? "text-green-600"
              : message.startsWith("❌")
              ? "text-red-600"
              : "text-gray-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;