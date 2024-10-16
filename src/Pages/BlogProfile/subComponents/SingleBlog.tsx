import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/Api/axiosInstance';

import { BlogPostCardProps } from '../../../Interfaces/Components';
import Modal from '../../../Components/Modal';
import ToastComponent from '../../../Components/ToastNotification';
import { handleAxiosError } from '../../../utils/errorHandling';
import SingleBlogCom from '../../../Components/SingleBlogCom';

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostCardProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmReportModalOpen, setConfirmReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosInstance.get(`/blog/singleBlog/${id}`, { withCredentials: true });
        setBlogPost(response.data.blog);
      } catch (err) {
        setError('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleReport = () => {
    setConfirmReportModalOpen(true); 
  }

  const handleReportConfirmation = async () => {
    if (reportReason.trim()) {
      try {
      const response=  await axiosInstance.post(`/blog/reportblog/${id}`, { reason: reportReason });
      console.log(response);
      
      if(response.status=200){
        setToastMessage('Blog post successfully reported!');
        setToastType('success');
        setToastOpen(true);
         setReportReason(''); 
         setConfirmReportModalOpen(false);
      }
      
      } catch (error) {
        let errormessage=handleAxiosError(error);
        setToastMessage(errormessage);
        setToastType('error')
        setToastOpen(true);
        
      }
    } else {

      setToastMessage('provide a valid reason');
      setToastType('error');
      setToastOpen(true);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!blogPost) {
    return <div>No blog post found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50  rounded-lg shadow-lg m-5">

      <SingleBlogCom blogPost={blogPost} />
     
      <div className="flex justify-end mt-4">
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200" 
        onClick={handleReport}>
          Report
        </button>
      </div>

      <Modal
          isOpen={isConfirmReportModalOpen} 
          onClose={() => setConfirmReportModalOpen(false)} 
          confirmMessage="Are you sure you want to report this blog post?" 
          onConfirm={handleReportConfirmation}
      >
        <div>
          <label className="block mb-2">Reason for reporting:</label>
          <textarea 
            value={reportReason} 
            onChange={(e) => setReportReason(e.target.value)} 
            className="border rounded w-full h-24 p-2"
            placeholder="Please enter your reason for reporting..."
            required
          />
        </div>
      </Modal>
      <ToastComponent
                open={toastOpen}
                setOpen={setToastOpen}
                message={toastMessage}
                type={toastType}
            />
    </div>
  );
};

export default SingleBlog;
