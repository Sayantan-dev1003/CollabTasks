import React, { useState, useEffect } from 'react';
import { getUserFromDB } from '../utils/indexedDB';

const AddUserModal = ({ isModalOpen, setIsModalOpen, organizationName, organizationId }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Member');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await getUserFromDB();
            setUser(storedUser);
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:5000/api/invite-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role, organization: organizationName, adminName: user.name, organizationId: organizationId }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send invitation');
            }

            setMessage('Invitation sent successfully!');
            setEmail('');
        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#000000bf] bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-[#5b2333]">Invite User</h3>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="User's Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-[0.1rem] focus:ring-[#5b2333]"
                    />
                    <select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-[0.1rem] focus:ring-[#5b2333]"
                    >
                        <option value="Manager">Manager</option>
                        <option value="Member">Member</option>
                    </select>
                    <input
                        type="text"
                        name="organization"
                        placeholder="Organization"
                        value={organizationName}
                        disabled
                        className="border text-gray-400 px-4 py-2 rounded-md cursor-not-allowed"
                    />
                    {message && (
                        <p
                            className={`${message.includes('successfully') ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[#5b2333] text-white rounded hover:bg-[#894b5c] transition duration-200 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Invitation'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200 cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;