import React, { useEffect, useState } from 'react';
import axiosAdminInstance from '../../services/Api/axioxAdminInstance';


interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  isBlock:boolean;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosAdminInstance.get<User[]>('/admin/users',{ withCredentials: true });
        console.log('Response from backend:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleBlock = async (userId: string, isBlocked: boolean) => {
  try {
    const endpoint = isBlocked ? '/admin/unblockUser' : '/admin/blockUser';
    const response = await axiosAdminInstance.post(endpoint, { userId }, { withCredentials: true });
    console.log(response);
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === userId ? { ...user, isBlock: !user.isBlock } : user 
      )
    );
  }catch (error) {
    console.error("Error blocking/unblocking user:", error);
  }
 }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-teal-950 via-blue-300 to-blue-100">
      <h1 className="text-3xl font-semibold mb-6 text-white">Users Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3"
        />
       
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-2 text-blue-700">{user.username}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Role: {user._id}</p>
              <p className="text-gray-500">
                Created At: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
    
                <button className={`${user.isBlock ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded transition-colors`}
                  onClick={() => handleBlock(user._id, user.isBlock)} >
                  {user.isBlock ? 'Unblock' : 'Block'}
                </button>
              </div>
           </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No users found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
