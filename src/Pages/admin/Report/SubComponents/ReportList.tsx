import { useState, useEffect } from 'react';
import axiosAdminInstance from '../../../../services/Api/axioxAdminInstance';
import { Table } from '@radix-ui/themes';
import Modal from '../../../../Components/Modal';
import ToastComponent from '../../../../Components/ToastNotification';
import { handleAxiosError } from '../../../../utils/errorHandling';
import { CreativeBlogLoading } from '../../../../Components/Fallback';
import { useNavigate } from 'react-router-dom';

const ReportList = () => {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<string | null>(null);
    const navigate=useNavigate()

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axiosAdminInstance.get('/admin/list-reportedBlog');
            if (response.status === 200) {
                setReports(response.data);
                setLoading(false);
            }
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            setError(errorMessage);
            setLoading(false);
        }
    };

    const handleDeleteConfirmation = async () => {
     
        if (reportToDelete) {
            try {
              const response= await axiosAdminInstance.delete(`/blog/delete-tag/${reportToDelete}`);
              if(response.status==200){
                setToastMessage('Report deleted successfully.');
                setToastType('success');
                setToastOpen(true);

              }
              
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                setToastMessage(errorMessage);
                setToastType('error');
                setToastOpen(true);
            } finally {
                setConfirmDeleteModalOpen(false);
            }
        }
    };

    const handleDelete = (id: string) => {
        setReportToDelete(id);
        setConfirmDeleteModalOpen(true);
    };

    const handleSingleBlog = (id: string) => {
        navigate(`/single/${id}`);
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <CreativeBlogLoading>
                    Fetching reported blogs...
                </CreativeBlogLoading>
            </div>
        );
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <Table.Root className="w-full">
                <Table.Header className="bg-gray-100">
                    <Table.Row>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Blog Post ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Author ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Reporter ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Reason</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Reported Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="px-4 py-2 text-left">Actions</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {reports.map((report) => (
                        <Table.Row key={report._id} className="border-t">
                            <Table.RowHeaderCell className="px-4 py-2">{report.blogPostId}</Table.RowHeaderCell>
                            <Table.Cell className="px-4 py-2">{report.authorId}</Table.Cell>
                            <Table.Cell className="px-4 py-2">{report.reporterId}</Table.Cell>
                            <Table.Cell className="px-4 py-2">{report.reason}</Table.Cell>
                            <Table.Cell className="px-4 py-2">
                                {new Date(report.createdAt).toLocaleDateString()}
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 flex space-x-4">
                                <button
                                    className="text-blue-500 hover:text-blue-700 font-semibold"
                                    onClick={() => handleDelete(report.blogPostId)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                    onClick={() => handleDelete(report._id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="text-blue-500 hover:text-blue-700 font-semibold"
                                    onClick={() => handleSingleBlog(report.blogPostId)}
                                >
                                    View
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <Modal
                isOpen={isConfirmDeleteModalOpen}
                onClose={() => setConfirmDeleteModalOpen(false)}
                confirmMessage="Are you sure you want to delete this report?"
                onConfirm={handleDeleteConfirmation}
            />

            <ToastComponent
                open={toastOpen}
                setOpen={setToastOpen}
                message={toastMessage}
                type={toastType}
            />
        </div>
    );
};

export default ReportList;
