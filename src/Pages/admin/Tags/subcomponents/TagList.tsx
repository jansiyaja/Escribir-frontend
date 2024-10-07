import  { useState, useEffect } from 'react';
import CreateTag from './CreateTag';
import axiosAdminInstance from '../../../../services/Api/axioxAdminInstance';
import { Table } from '@radix-ui/themes';
import Modal from '../../../../Components/Modal';
import { Tag } from '../../../../Interfaces/Components';
import ToastComponent from '../../../../Components/ToastNotification';


const TagList = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [tagToEdit, setTagToEdit] = useState<Tag | null>(null);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [tagToDelete, setTagToDelete] = useState<string | null>(null);


    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axiosAdminInstance.get('/admin/list-tags');
            setTags(response.data);
            setLoading(false);
        } catch (error: any) {
            setError('Failed to fetch tags');
            setLoading(false);
        }
    };

    const handleTagCreatedOrUpdated = () => {
        fetchTags();  
        closeModal(); 
    };

    const handleEdit = (tag:Tag) => {
        setTagToEdit(tag);
        setEditMode(true);
        openModal();
    };

        

    const handleDeleteConfirmation = async () => {
        if (tagToDelete) {
            try {
                await axiosAdminInstance.delete(`/admin/delete-tag/${tagToDelete}`);
                setTags(tags.filter(tag => tag._id !== tagToDelete));
                setToastMessage('Tag successfully deleted!');
                setToastType('success');
                setToastOpen(true);
            } catch (error: any) {
                setError('Failed to delete tag');
                setToastMessage('Failed to delete tag');
                setToastType('error');
                setToastOpen(true);
            } finally {
                setConfirmDeleteModalOpen(false);
                setTagToDelete(null);
            }
        }
    };

    const handleDelete = (tagId: string) => {
        setTagToDelete(tagId);
        setConfirmDeleteModalOpen(true); 
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setEditMode(false);
        setTagToEdit(null);
    };


    if (loading) {
        return <p>Loading tags...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <div className="flex items-center mb-4 justify-end">
         
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={openModal}
        >
          Add Tag +
        </button>
          </div>
          
          <Table.Root className="w-full">
            <Table.Header className="bg-gray-100">
              <Table.Row>
                <Table.ColumnHeaderCell className="px-4 py-2 text-left">Tag Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-4 py-2 text-left">Created Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="px-4 py-2 text-left">Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
    
            <Table.Body>
              {tags.map((tag: { _id: string; name: string; createdAt: string }) => (
                <Table.Row key={tag._id} className="border-t">
                  <Table.RowHeaderCell className="px-4 py-2">{tag.name}</Table.RowHeaderCell>
                  <Table.Cell className="px-4 py-2">{new Date(tag.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="px-4 py-2 flex space-x-4">
                                <button
                                    onClick={() => handleEdit(tag)}
                                    className="text-blue-500 hover:text-blue-700 font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(tag._id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Delete
                                </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <div className="bg-white rounded-lg shadow-md p-6 w-full">
           
            <Modal 
                isOpen={isConfirmDeleteModalOpen} 
                onClose={() => setConfirmDeleteModalOpen(false)} 
                confirmMessage="Are you sure you want to delete this tag?" 
                onConfirm={handleDeleteConfirmation}
            />
          
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CreateTag 
                    onTagCreatedOrUpdated={handleTagCreatedOrUpdated} 
                    tagToEdit={isEditMode ? tagToEdit : null} 
                    isEditMode={isEditMode}
                />
            </Modal>
           
        </div>

            <ToastComponent
        open={toastOpen}
        setOpen={setToastOpen}
        message={toastMessage}
        type={toastType}
      />
    
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm">Items per page: 10</p>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">←</button>
              <span className="text-sm">1 of 10</span>
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">→</button>
            </div>
          </div>
        </div>
      );
};

export default TagList;
