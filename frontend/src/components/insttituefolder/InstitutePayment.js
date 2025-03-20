import React from "react";
import InstituteMain from "../InstituteMain";

const InstitutePayment = () => {
  return (
    <div className="p-6">
      {/* 🔹 Page Title */}
      <h1 className="text-2xl font-semibold mb-4">Institute Management</h1>

      {/* 🔹 Render InstituteMain with Modifications */}
      <InstituteMain hideHeader={true} showPaymentStatus={true} />
    </div>
  );
};

export default InstitutePayment;

