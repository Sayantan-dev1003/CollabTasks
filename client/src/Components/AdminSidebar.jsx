import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClasses = (path) =>
        `text-sm flex items-center gap-2 border-b-[0.1rem] border-b-[#894b5c] px-2 py-1.5 cursor-pointer transition-transform duration-300 ${
            isActive(path)
                ? 'bg-[#894b5c] rounded-sm text-white'
                : 'hover:bg-[#894b5c] hover:rounded-sm text-[#f7f4f3]'
        }`;

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
                    <li
                        className={linkClasses('/admin-dashboard')}
                        onClick={() => { navigate('/admin-dashboard'); onClose(); }}
                    >
                        Dashboard
                    </li>
                    <li
                        className={linkClasses('/admin/user-management')}
                        onClick={() => { navigate('/admin/user-management'); onClose(); }}
                    >
                        Users Management
                    </li>
                    <li
                        className={linkClasses('/admin/organization-info')}
                        onClick={() => { navigate('/admin/organization-info'); onClose(); }}
                    >
                        Organization Info
                    </li>
                    <li
                        className={linkClasses('/admin/settings')}
                        onClick={() => { navigate('/admin/settings'); onClose(); }}
                    >
                        Settings
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;