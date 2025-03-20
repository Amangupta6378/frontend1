// components/instituteFolder/InstituteRoute.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import InstituteSidebar from "./InstituteSidebar";
import InstituteMain from "../InstituteMain";
import InstituteStudent from "./InstituteStudent";
import InstitutePayment from "./InstitutePayment";
import InstituteInstallment from "./InstituteInstallment";
import InstituteLogout from "./InstituteLogout";

const InstituteRoute = () => {
  return (
    <div className="flex">
      {/* Sidebar for Institute */}
      <InstituteSidebar />

      {/* Main Content */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<InstituteMain/>} />
          <Route path="/students" element={ <InstituteStudent/> } />
          <Route path="/institute-payments" element={ <InstitutePayment/> } />
          <Route path="/institute-installment" element={ <InstituteInstallment/> } />
          <Route path="/institute-logout" element={ <InstituteLogout/> } />
          <Route path="/fees" element={<h1>Fee Management</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default InstituteRoute;

