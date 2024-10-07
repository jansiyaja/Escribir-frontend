import React, { useState, useEffect } from 'react';
import axiosAdminInstance from '../../../../services/Api/axioxAdminInstance';
import { CreateTagProps } from '../../../../Interfaces/Components';

const CreateTag: React.FC<CreateTagProps> = ({ onTagCreatedOrUpdated, tagToEdit, isEditMode }) => {
    const [tagName, setTagName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        if (isEditMode && tagToEdit) {
            setTagName(tagToEdit.name);
        } else {
            setTagName('');
        }
    }, [isEditMode, tagToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && tagToEdit) {
                
                console.log("Editing tag with ID:", tagToEdit._id);
                await axiosAdminInstance.put(`/admin/update-tag/${tagToEdit._id}`, { name: tagName }, { withCredentials: true });
                setSuccess('Tag updated successfully');
            } else {
              
                await axiosAdminInstance.post('/admin/createtags', { name: tagName }, { withCredentials: true });
                setSuccess('Tag created successfully');
            }
            setTagName(''); 
            onTagCreatedOrUpdated();  
        } catch (error: any) {
            setError('Failed to submit tag');
        }
    };

    return (
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {isEditMode ? 'Edit Tag' : 'Create New Tag'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tag Name
                        </label>
                        <input
                            type="text"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter tag name"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="submit"
                            className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white 
                                ${isEditMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}
                                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isEditMode ? 'Update Tag' : 'Create Tag'}
                        </button>
                    </div>
                </form>

              
                {error && (
                    <p className="mt-4 text-red-500 text-sm">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="mt-4 text-green-500 text-sm">
                        {success}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CreateTag;
