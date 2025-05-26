import React, { useState } from 'react';

const AddUserModal = ({ isModalOpen, setIsModalOpen, organizationName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Member',
        organization: organizationName,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-[#000000bf] bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-[#5b2333]">Add User</h3>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-[0.1rem] focus:ring-[#5b2333]"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-[0.1rem] focus:ring-[#5b2333]"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-[0.1rem] focus:ring-[#5b2333]"
                            />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
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
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-[#5b2333] text-white rounded hover:bg-[#894b5c] transition duration-200 cursor-pointer">
                                Add User
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddUserModal