import React, { useState } from 'react';
import { FaPlus, FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import CreateOrganizationModal from './CreateOrganizationModal';
import { useAuth } from '../Context/AuthContext';

const AdminHeader = ({ onBurgerClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    return (
        <header className="bg-[#f7f4f3] text-[#5b2333] flex justify-between items-baseline py-4 px-8 shadow-lg">
            <div className="flex items-center">
                <h1 className='montserrat text-2xl font-bold'>CollabTasks</h1>
            </div>
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm flex items-center gap-2 bg-[#5b2333] text-[#f7f4f3] rounded-md px-4 py-1.5 hover:bg-[#894b5c] transition duration-150 cursor-pointer"
                    disabled={!user}
                >
                    <FaPlus className='text-xs' />Create Organization
                </button>

                <div className='flex justify-center items-baseline gap-1'>
                    {user ? (
                        <>
                            <p className="text-base font-bold">{user.name}</p>
                            <p className="text-xs text-[#5b2333]">{user.role}</p>
                        </>
                    ) : (
                        <p className="text-sm italic text-[#5b2333]">Loading user...</p>
                    )}
                </div>

                <FaBell className='cursor-pointer hover:text-[#894b5c]' />
                <FaSignOutAlt className='cursor-pointer hover:text-[#894b5c]' />
                <FaBars onClick={onBurgerClick} className='cursor-pointer hover:text-[#894b5c]' />
            </div>

            {user && (
                <CreateOrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    adminName={user.name}
                    adminEmail={user.email}
                />
            )}
        </header>
    );
};

export default AdminHeader;