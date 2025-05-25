import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <div className={`fixed top-0 right-0 h-full w-64 bg-[#5b2333] text-[#f7f4f3] shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="p-4 flex flex-col">
                <button className="absolute top-5 right-5" onClick={onClose}>
                    <FaTimes className="text-2xl cursor-pointer" />
                </button>
                <h1 className='montserrat text-2xl font-bold mb-4'>CollabTasks</h1>
                <ul className="flex flex-col gap-4 mt-6">
                    <li className="text-sm flex items-center gap-2 border-b-[0.1rem] border-b-[#894b5c] text-[#f7f4f3] px-2 py-1.5 hover:bg-[#894b5c] hover:rounded-sm transition duration-150 cursor-pointer"
                        onClick={() => { navigate('/admin-dashboard'); onClose(); }}>
                        Dashboard
                    </li>
                    <li className="text-sm flex items-center gap-2 border-b-[0.1rem] border-b-[#894b5c] text-[#f7f4f3] px-2 py-1.5 hover:bg-[#894b5c] hover:rounded-sm transition duration-150 cursor-pointer"
                        onClick={() => { navigate('/users-management'); onClose(); }}>
                        Users Management
                    </li>
                    <li className="text-sm flex items-center gap-2 border-b-[0.1rem] border-b-[#894b5c] text-[#f7f4f3] px-2 py-1.5 hover:bg-[#894b5c] hover:rounded-sm transition duration-150 cursor-pointer"
                        onClick={() => { navigate('/organization-info'); onClose(); }}>
                        Organization Info
                    </li>
                    <li className="text-sm flex items-center gap-2 border-b-[0.1rem] border-b-[#894b5c] text-[#f7f4f3] px-2 py-1.5 hover:bg-[#894b5c] hover:rounded-sm transition duration-150 cursor-pointer"
                        onClick={() => { navigate('/settings'); onClose(); }}>
                        Settings
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;