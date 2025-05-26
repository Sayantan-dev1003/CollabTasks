import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Pages/Signup'
import Signin from './Pages/Signin';
import Register from './Pages/Register';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserManagement from './Pages/Admin/UserManagement';
import OrganizationInfo from './Pages/Admin/OrganzationInfo';
import Settings from './Pages/Admin/Settings';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
                <Route path="/admin/organization-info" element={<OrganizationInfo />} />
                <Route path="/admin/settings" element={<Settings />} />
            </Routes>
        </div>
    )
}

export default App