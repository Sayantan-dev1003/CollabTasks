import React, { useState } from 'react';
import { updateUser } from '../utils/indexedDB';

const CreateOrganizationModal = ({ isOpen, onClose, adminId, adminName, adminEmail }) => {
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationDomain: '',
        organizationDescription: '',
        organizationIndustry: '',
        organizationSize: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            console.log(adminId, adminName, adminEmail);
            const response = await fetch('http://localhost:5000/api/create-organization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, adminId, adminName, adminEmail }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const getUserResponse = await fetch(`http://localhost:5000/api/user/${adminId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!getUserResponse.ok) {
                throw new Error(`HTTP error! status: ${getUserResponse.status}`);
            }
            const adminData = await getUserResponse.json();
            const adminOrganizationId = adminData.organization;
            await updateUser({ adminOrganizationId });

            onClose();
        } catch (error) {
            console.error('Error creating organization:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#000000bf] bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
                <h2 className="text-2xl font-bold text-[#5b2333] mb-4 text-center">Create Organization</h2>

                <p className="text-sm text-[#5b2333] mb-4 text-center">Create a new organization to get started</p>
                                
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="organizationName"
                        placeholder="Organization Name *"
                        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b2333]"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="organizationDomain"
                        placeholder="Organization Domain"
                        className="border px-4 py-2 rounded-md"
                        value={formData.organizationDomain}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="organizationDescription"
                        placeholder="Description"
                        className="border px-4 py-2 rounded-md resize-none"
                        value={formData.organizationDescription}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                    <select
                        name="organizationIndustry"
                        className="border px-4 py-2 rounded-md"
                        value={formData.organizationIndustry}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Industry</option>
                        <option value="Tech">Tech</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Retail">Retail</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        name="organizationSize"
                        className="border px-4 py-2 rounded-md"
                        value={formData.organizationSize}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Organization Size</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500+">500+</option>
                    </select>
                    <input
                        type="text"
                        value={adminName}
                        name="adminName"
                        disabled
                        className="bg-gray-100 border px-4 py-2 rounded-md cursor-not-allowed"
                        readOnly
                    />
                    <input
                        type="email"
                        value={adminEmail}
                        name="adminEmail"
                        disabled
                        className="bg-gray-100 border px-4 py-2 rounded-md cursor-not-allowed"
                        readOnly
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[#5b2333] text-white rounded-md hover:bg-[#894b5c] transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrganizationModal;