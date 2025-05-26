import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { FaPlus, FaArrowUp, FaArrowDown, FaTrashAlt } from 'react-icons/fa';
import AddUserModal from '../../Components/AddUserModal';
import { getUserFromDB } from '../../utils/indexedDB';

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [organizationName, setOrganizationName] = useState('');
  const [organizationId, setOrganizationId] = useState('');

  useEffect(() => {
    const fetchAdminOrgIdAndUsers = async () => {
      const user = await getUserFromDB();
      const orgId = user?.organization;
      setOrganizationId(orgId);
  
      if (!orgId) return;
  
  
      try {
        const response = await fetch(`http://localhost:5000/api/user/organization/${orgId}`);
        const data = await response.json();
        setUsers(Array.isArray(data.users) ? data.users.map(user => ({...user, organizationName: data.organizationName})) : []);
        setOrganizationName(data.organizationName);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsers([]);
      }
    };
  
    fetchAdminOrgIdAndUsers();
  }, []);  

  const promoteUser = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'Manager' }),
    });
  
    const data = await response.json();
    if (response.ok) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, role: data.role } : user
        )
      );
    }
  };
  
  const demoteUser = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'Member' }),
    });
  
    const data = await response.json();
    if (response.ok) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, role: data.role } : user
        )
      );
    }
  };  

  const removeUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to remove this user?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };  

  const sortedUsers = [...users].sort((a, b) => {
    const rolePriority = { admin: 0, manager: 1, member: 2 };
    return rolePriority[a.role] - rolePriority[b.role];
  });

  return (
    <AdminLayout>
      <div className='w-full flex flex-col items-center justify-between'>
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#5b2333]">User Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#5b2333] text-[#f7f4f3] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#894b5c] transition"
          >
            <FaPlus className="text-sm" />
            Add User
          </button>
        </div>

        <div className="w-4/5 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm">
            <thead className="bg-[#5b2333] text-white">
              <tr>
                <th className="px-6 py-3 text-center font-semibold">Name</th>
                <th className="px-6 py-3 text-center font-semibold">Email</th>
                <th className="px-6 py-3 text-center font-semibold">Role</th>
                <th className="px-6 py-3 text-center font-semibold">Organization</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-[#f7f4f3]">
                    <td className="px-6 py-4 text-center">{user.name}</td>
                    <td className="px-6 py-4 text-center">{user.email}</td>
                    <td className="px-6 py-4 text-center capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-center">{user.organizationName}</td>
                    <td className="px-6 py-4 flex gap-2 justify-center items-baseline">
                      {user.role === 'Manager' && (
                        <button
                          onClick={() => demoteUser(user._id)}
                          className="flex text-xs gap-1 justify-center cursor-pointer items-center bg-orange-400 text-white rounded-md p-2 font-medium hover:bg-orange-500 transition"
                        >
                          <FaArrowDown className="text-[0.65rem]" />
                          Demote
                        </button>
                      )}
                      {user.role === 'Member' && (
                        <button
                          onClick={() => promoteUser(user._id)}
                          className="flex text-xs gap-1 justify-center cursor-pointer items-center bg-green-500 text-white rounded-md p-2 font-medium hover:bg-green-600 transition"
                        >
                          <FaArrowUp className="text-[0.65rem]" />
                          Promote
                        </button>
                      )}
                      {(user.role === 'Manager' || user.role === 'Member') && (
                        <button
                          onClick={() => removeUser(user._id)}
                          className="flex text-xs gap-1 justify-center cursor-pointer items-center bg-red-500 text-white rounded-md p-2 font-medium hover:bg-red-600 transition"
                        >
                          <FaTrashAlt className="text-[0.65rem]" />
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No users found in this organization.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} organizationName={organizationName} organizationId={organizationId} />
    </AdminLayout>
  );
};

export default UserManagement;