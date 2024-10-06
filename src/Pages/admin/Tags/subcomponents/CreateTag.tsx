import React, { useState } from 'react';
import axiosAdminInstance from '../../../../services/Api/axioxAdminInstance';

interface CreateTagProps {
    onTagCreated: () => void; 
}
const CreateTag: React.FC<CreateTagProps> = ({ onTagCreated }) => {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axiosAdminInstance.post('/admin/createtags', { name: tagName }, { withCredentials: true });
        if (response.status === 201) {
            setSuccess('Tag created successfully');
            setTagName('');

           
            onTagCreated();
        }
    } catch (error: any) {
        if (error.response) {
            setError(error.response.data.message || 'An error occurred');
        }
    }
};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create New Tag</h2>
      <form onSubmit={handleCreateTag} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tag Name</label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter tag name"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Tag
          </button>
        </div>
      </form>

     
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default CreateTag;
