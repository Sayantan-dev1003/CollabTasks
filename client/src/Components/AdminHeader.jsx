import React from 'react';
import { FaPlus, FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';

const AdminHeader = ({ onBurgerClick }) => {
    return (
        <header className="bg-[#f7f4f3] text-[#5b2333] flex justify-between items-baseline py-4 px-8 shadow-lg">
            <div className="flex items-center">
                <h1 className='montserrat text-2xl font-bold'>CollabTasks</h1>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-sm flex items-center gap-2 bg-[#5b2333] text-[#f7f4f3] rounded-md px-4 py-1.5 hover:bg-[#894b5c] transition duration-150 cursor-pointer">
                    <FaPlus className='text-xs' />Create Organization
                </button>
                <div className='flex justify-center items-baseline gap-1'>
                    <p className="text-base font-bold">Sayantan Halder</p>
                    <p className="text-xs text-[#5b2333]">Admin</p>
                </div>
                <FaBell className='cursor-pointer hover:text-[#894b5c]' />
                <FaSignOutAlt className='cursor-pointer hover:text-[#894b5c]' />
                <FaBars onClick={onBurgerClick} className='cursor-pointer hover:text-[#894b5c]' />
            </div>
        </header>
    );
};

export default AdminHeader;