import React, { useState, useEffect } from 'react';
import { FaPlus, FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import CreateOrganizationModal from './CreateOrganizationModal';
import { getUserFromDB } from '../utils/indexedDB';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onBurgerClick }) => {
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await getUserFromDB();
            setUser(storedUser);
            setIsUserLoaded(true);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                navigate('/', { replace: true });
            } else {
                console.log('Error logging out: ', response.statusText);
            }
        } catch (error) {
            console.log('Error logging out: ', error);
        }
    };

    return (
        <header className="bg-[#f7f4f3] text-[#5b2333] flex justify-between items-baseline py-4 px-8 shadow-lg">
            <div className="flex items-center">
                <h1 className='montserrat text-2xl font-bold'>CollabTasks</h1>
            </div>

            <div className="flex items-center gap-6">
                {isUserLoaded && user && !user.organization && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm flex items-center gap-2 bg-[#5b2333] text-[#f7f4f3] rounded-md px-4 py-1.5 hover:bg-[#894b5c] transition duration-150 cursor-pointer"
                    >
                        <FaPlus className='text-xs' />Create Organization
                    </button>
                )}

                <div className='flex justify-center items-baseline gap-1'>
                    {isUserLoaded ? (
                        <>
                            <p className="text-base font-bold">{user?.name}</p>
                            <p className="text-xs text-[#5b2333]">{user?.role}</p>
                        </>
                    ) : (
                        <p className="text-sm italic text-[#5b2333]">Loading user...</p>
                    )}
                </div>

                <FaBell className='cursor-pointer hover:text-[#894b5c]' />
                <FaSignOutAlt onClick={handleLogout} className='cursor-pointer hover:text-[#894b5c]' />
                <FaBars onClick={onBurgerClick} className='cursor-pointer hover:text-[#894b5c]' />
            </div>

            {isUserLoaded && user && (
                <CreateOrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    adminId={user.id}
                    adminName={user.name}
                    adminEmail={user.email}
                />
            )}
        </header>
    );
};

export default AdminHeader;