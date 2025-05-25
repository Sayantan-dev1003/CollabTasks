import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Pages/Signup'
import Signin from './Pages/Signin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </div>
    )
}

export default App