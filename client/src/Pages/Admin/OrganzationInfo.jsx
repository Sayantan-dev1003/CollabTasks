import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

const OrganizationInfo = () => {
  return (
    <AdminLayout>
      <div className='w-full flex flex-col gap-6'>
        <h1 className="text-2xl font-bold text-[#5b2333]">Organization Details</h1>

        <div className='w-full flex gap-6'>
          {/* Left Side Form */}
          <div className='w-2/3'>
            <div className='flex flex-col gap-4'>

              <div>
                <label className="block text-sm font-semibold text-[#5b2333] mb-1">Name:</label>
                <input type='text' placeholder='Enter organization name' className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#5b2333] mb-1">Description:</label>
                <textarea placeholder='Enter organization description' className='w-full p-2 border rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
              </div>

              {/* Domain + Industry Type */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Domain:</label>
                  <input type='text' placeholder='Enter organization domain' className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Industry Type:</label>
                  <select className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]'>
                    <option value=''>Select industry type</option>
                    <option value='Technology'>Technology</option>
                    <option value='Finance'>Finance</option>
                    <option value='Healthcare'>Healthcare</option>
                  </select>
                </div>
              </div>

              {/* Company Size + Headquarters */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Company Size:</label>
                  <select className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]'>
                    <option value=''>Select company size</option>
                    <option value='1-10 employees'>1-10 employees</option>
                    <option value='11-50 employees'>11-50 employees</option>
                    <option value='51-200 employees'>51-200 employees</option>
                    <option value='201-500 employees'>201-500 employees</option>
                    <option value='501+ employees'>501+ employees</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Headquarters:</label>
                  <input type='text' placeholder='Enter organization headquarters' className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
                </div>
              </div>

              {/* Type + Founded */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Type:</label>
                  <select className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]'>
                    <option value=''>Select organization type</option>
                    <option value='Private'>Private</option>
                    <option value='Public'>Public</option>
                    <option value='Non-profit'>Non-profit</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-[#5b2333] mb-1">Founded:</label>
                  <input type='number' placeholder='Enter organization founding year' className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#5b2333] mb-1">Specialties:</label>
                <input type='text' placeholder='Enter organization specialties (comma separated)' className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5b2333]' />
              </div>

            </div>
          </div>

          {/* Right Side Placeholder */}
          <div className='w-1/3'>
            {/* Contact Card */}
            <div className="bg-[#5b2333] text-white rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <span className="font-semibold">Contact: </span>
                  +91 98765 43210
                </div>
                <div>
                  <span className="font-semibold">Email: </span>
                  contact@organization.com
                </div>
                <div>
                  <span className="font-semibold">Address: </span>
                  123 Organization Street, City, State, ZIP
                </div>
              </div>
            </div>

            {/* Subscription Plan Info */}
            <div className="bg-[#f7f4f3] border border-gray-300 rounded-lg mt-6 p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Subscription Plan</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  <span className="font-medium">Plan:</span> Premium
                </div>
                <div>
                  <span className="font-medium">Price:</span> ₹1,999/month
                </div>
                <div>
                  <span className="font-medium">Features:</span>
                  <ul className="list-disc list-inside ml-2">
                    <li>Unlimited users</li>
                    <li>Advanced analytics</li>
                    <li>Priority customer support</li>
                    <li>Custom integrations</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Next Billing Date:</span> 30 June 2025
                </div>
                <div>
                  <span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrganizationInfo;