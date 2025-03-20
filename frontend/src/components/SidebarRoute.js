import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Student from './Student';
import Payment from './Payment';
import Sidebarr from './Sidebarr';
import SelectInstitutre from './SelectInstitutre';
import StudentDetail from './Studenttt/StudentDetail';
import FeeComponent from './Studenttt/FeeComponent';
import FeeStructure from './Studenttt/FeeStructure';
import DetailedFeeComponent from './Studenttt/DetailedFeeComponent';
import StudentView from './Studenttt/StudentView';
import Flex from './Studenttt/Flex';
import InstituteSidebar from './insttituefolder/InstituteSidebar';

const SidebarRoute = () => {
    const location = useLocation();
    
    // 🛠 Sidebar selection based on the route
    const isInstitutePage = location.pathname.startsWith("/institute-main");

    return (
        <div className="flex h-screen">
            {/* ✅ Now, Institute Sidebar will only show on "/institute-main/*" routes */}
            {isInstitutePage ? <InstituteSidebar /> : <Sidebarr />}

            {/* Main Content Area */}
            <div className="flex-grow p-6 bg-gray-100">
                <Routes>
                    <Route path="/students/:instituteId?" element={<Student />} />
                    <Route path="/payments" element={<Payment />} />
                    <Route path="/flex" element={<Flex />} />
                    <Route path="/student/:id" element={<StudentView />} />
                    <Route path="/select-institute" element={<SelectInstitutre />} />
                    <Route path="/studentDetail" element={<StudentDetail />} />
                    <Route path="/detailed-fee/:studentId" element={<DetailedFeeComponent />} />
                    <Route path="/feecomponent/:studentId" element={<FeeComponent />} />
                    <Route path="/fee-structure/:studentId" element={<FeeStructure />} />
                    <Route path="*" element={<Navigate to="/students" />} />
                </Routes>
            </div>
        </div>
    );
};

export default SidebarRoute;


