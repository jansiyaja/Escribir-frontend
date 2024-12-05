import React, { useEffect, useState } from 'react';
import axiosAdminInstance from '../../services/Api/axioxAdminInstance';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  isBlock: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
    const [totalUsers, setTotalUsers] =useState(0);
    console.log("total",totalUsers);
    

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosAdminInstance.get<User[]>('/admin/users', { withCredentials: true });
        console.log('Response from backend:', response.data);
        setUsers(response.data);
        setTotalUsers(response.data.length); 
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
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  };

  const filteredUsers = users.filter(
    user => user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
      <div className="p-8 min-h-screen bg-gray-100">
           <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-800">Users Dashboard</h1>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Total Users:</span>
          <span className="text-black text-lg font-semibold">{totalUsers}</span>
        </div>
          </div>
 
      {/* Search Input */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Username</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Role</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Created At</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Status</th>
                <th className="py-2 px-4 text-center text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-2 px-4 text-gray-800">{user.username}</td>
                  <td className="py-2 px-4 text-gray-600">{user.email}</td>
                  <td className="py-2 px-4 text-gray-600">{user.role}</td>
                  <td className="py-2 px-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${user.isBlock ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                      {user.isBlock ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className={`px-4 py-2 text-white font-semibold rounded-md transition-all ${user.isBlock ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                      onClick={() => handleBlock(user._id, user.isBlock)}
                    >
                      {user.isBlock ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
