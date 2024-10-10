import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../services/Api/axiosInstance';
import { BlogPostCardProps } from '../../../Interfaces/Components'; 
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import ToastComponent from '../../../Components/ToastNotification';

const EditBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blogPost, setBlogPost] = useState<BlogPostCardProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'published' | 'draft'>('draft'); 
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axiosInstance.get(`/blog/getblog/${id}`, { withCredentials: true });
                setBlogPost(response.data.blog);
                setStatus(response.data.blog.status || 'draft'); 
            } catch (err) {
                setError('Failed to fetch blog post for editing');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (blogPost) {
            setBlogPost({ ...blogPost, [name]: value });
        }
    };

    const handleEditorChange = (value: string) => {
        if (blogPost) {
            setBlogPost({ ...blogPost, content: value });
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as 'published' | 'draft'); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!blogPost) return;

        const updatedBlogPost = { ...blogPost, status };

        try {
            const response = await axiosInstance.put(`/blog/blogeditor/${id}`, updatedBlogPost, { withCredentials: true });
            setToastMessage('Blog post updated successfully!');
            setToastType('success');
            setToastOpen(true);

           
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000); 

        } catch (err) {
            console.error('Failed to update blog post', err);
            setToastMessage('Failed to update blog post');
            setToastType('error');
            setToastOpen(true);
        }
    };

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
        <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-lg shadow-lg m-5">
            <h2 className="text-3xl font-bold mb-4">Edit Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="heading" className="block text-sm font-semibold text-gray-700">Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={blogPost.heading}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-semibold text-gray-700">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        value={blogPost.tag}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Cover Image</label>
                    {blogPost.coverImageUrl && (
                        <img src={blogPost.coverImageUrl} alt="Cover" className="mt-2 mb-2 w-full h-auto rounded-md" />
                    )}
                    <input
                        type="text"
                        name="coverImageUrl"
                        value={blogPost.coverImageUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Content</label>
                    <ReactQuill 
                        theme="snow" 
                        value={blogPost.content} 
                        onChange={handleEditorChange} 
                        className="mt-1 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Radio buttons for post status */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                    <label className="inline-flex items-center mr-4">
                        <input 
                            type="radio" 
                            value="published" 
                            checked={status === 'published'} 
                            onChange={handleStatusChange} 
                            className="form-radio"
                        />
                        <span className="ml-2">Publish</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input 
                            type="radio" 
                            value="draft" 
                            checked={status === 'draft'} 
                            onChange={handleStatusChange} 
                            className="form-radio"
                        />
                        <span className="ml-2">Save as Draft</span>
                    </label>
                </div>

                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Update Blog Post
                </button>
            </form>

          
            <ToastComponent
                open={toastOpen} 
                setOpen={setToastOpen} 
                message={toastMessage} 
                type={toastType} 
            />
        </div>
    );
};

export default EditBlog;
