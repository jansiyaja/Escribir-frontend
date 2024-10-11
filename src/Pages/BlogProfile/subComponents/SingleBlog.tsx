import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/Api/axiosInstance';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; 
import { BlogPostCardProps } from '../../../Interfaces/Components';
import Modal from '../../../Components/Modal';
import ToastComponent from '../../../Components/ToastNotification';
import { handleAxiosError } from '../../../utils/errorHandling';

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
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{blogPost.heading}</h1>
        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 mt-4 ms-1 rounded-lg">
          {blogPost.tag}
        </span>

        <div className="flex items-center mt-6 p-4 rounded-lg">
          <img
            src={blogPost.author_id.image}
            alt="Author"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-md text-gray-500 mt-2">
              <span className="font-semibold">
                Written by {blogPost.author_id.username}
              </span>{' '}
              | <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <img
          src={blogPost.coverImageUrl}
          alt={blogPost.heading}
          className="w-full h-auto rounded-lg"
        />
      </div>

 
      <div className="text-lg text-gray-700 leading-relaxed">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {blogPost.content}
        </ReactMarkdown>
      </div>

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
