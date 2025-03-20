import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaWhatsapp, FaRupeeSign, FaSpinner } from "react-icons/fa";

const PaymentForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/create-payment-link",
        { email, phone, amount }
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
        {/* Email */}
        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaEnvelope className="mr-2 text-blue-500" /> Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter email"
            required
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp Number:
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter WhatsApp number"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="flex items-center mb-2 font-medium text-gray-700">
            <FaRupeeSign className="mr-2 text-yellow-500" /> Amount (INR):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!email || !phone || !amount || isLoading}
          className={`w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center transition-all duration-300 ${
            email && phone && amount
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

      {/* Message Display */}
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