import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  phoneNumber?: string; 
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>('/admin/users');
        console.log('Response from backend:', response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Users Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add User</button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Created Date</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>C
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{user.phoneNumber || 'N/A'}</td>
              <td className="py-2 px-4 border-b flex justify-center">
                
                <button className="text-red-500 hover:underline">Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
