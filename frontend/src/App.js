// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstituteAdd from "./components/InstituteAdd";


import SidebarRoute from "./components/SidebarRoute";
import InsttituteLogin from "./components/insttituefolder/InsttituteLogin";
import InstituteRoute from "./components/insttituefolder/InstituteRoute";
import PaymentForm from "./components/PaymentForm";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Institute Add Page */}
        <Route path="/add-institute" element={<InstituteAdd />} />

        {/* Institute Login Page */}
        <Route path="/institute-login" element={<InsttituteLogin />} />
        <Route path="/payment-forms" element={<PaymentForm />} />

        {/* Institute Main Pages with Sidebar */}
        <Route path="/institute-main/*" element={<InstituteRoute/>} />

        {/* Default Admin Pages with Admin Sidebar */}
        <Route path="/*" element={<SidebarRoute />} />
      </Routes>
    </Router>
  );
};

export default App;

