import React, { useState } from 'react';
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen flex flex-col">
            <AdminHeader onBurgerClick={toggleSidebar} />
            <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <main className='px-8 py-4'>{children}</main>
        </div>
    );
};

export default AdminLayout;