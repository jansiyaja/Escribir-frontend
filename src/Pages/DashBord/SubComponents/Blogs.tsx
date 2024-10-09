import { useEffect, useState } from "react";
import BlogPostCard from "../../BlogProfile/subComponents/BlogPostCard";
import axiosInstance from "../../../services/Api/axiosInstance";
import { BlogPostCardProps } from "../../../Interfaces/Components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../../utils/errorHandling";
import Modal from "../../../Components/Modal";
import ToastComponent from "../../../Components/ToastNotification";


const Blogs: React.FC = () => {
    const [filteredPosts, setFilteredPosts] = useState<BlogPostCardProps[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [noBlogsFound, setNoBlogsFound] = useState(false); 
    const { user } = useSelector((state: RootState) => state.auth);
    const userId = user?._id;
    const navigate = useNavigate();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosInstance.get(`/blog/your-blog/${userId}`, { withCredentials: true });
                
                if (response.data.blogs) {
                    setFilteredPosts(response.data.blogs);
                    setNoBlogsFound(response.data.blogs.length === 0); 
                } else {
                    setFilteredPosts([]);
                    setNoBlogsFound(true);
                }
            } catch (err: any) {
                if (err.response && err.response.status === 404) {
                    setNoBlogsFound(true);
                } else {
                    console.error("Error fetching blogs:", err);
                }
            }
        };

        if (userId) {
            fetchBlogs();
        }
    }, [userId]);

    const handleCreateBlog = () => {
        navigate("/blog");
    };
    
    const handleSingleBlog = (id: string) => {
        navigate(`/singleblog/${id}`);
    };

    const handleDoubleClick = (id: string) => {
        setSelectedPostId((prevId) => (prevId === id ? null : id));
    };

    const handleEdit = (id: string) => {
        const postToEdit = filteredPosts.find(post => post._id === id);
        if (postToEdit) {
            navigate("/blog", { state: { post: postToEdit } }); 
        }
       
    };

    const handleDeleteConfirmation = async () => {
        if (postToDelete) {
            try {
                await axiosInstance.delete(`/blog/delete-tag/${postToDelete}`);
                setFilteredPosts(filteredPosts.filter(post => post._id !== postToDelete));
                setToastMessage('Blog post successfully deleted!');
                setToastType('success');
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                
                setToastMessage(errorMessage);
                setToastType('error');
            } finally {
                setToastOpen(true);
                setConfirmDeleteModalOpen(false);
                setPostToDelete(null);
            }
        }
    };

    const handleDelete = (id: string) => {
        setPostToDelete(id);
        setConfirmDeleteModalOpen(true); 
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
            {noBlogsFound ? (
                <div className="flex flex-col items-center justify-center w-full">
                    <p className="text-lg font-semibold">No blogs found for this user.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        onClick={handleCreateBlog}
                    >
                        Create Your First Blog
                    </button>
                </div>
            ) : (
                filteredPosts.map((post) => (
                    <div 
                        key={post._id} 
                        onDoubleClick={() => handleDoubleClick(post._id)} 
                        className="relative cursor-pointer"
                    >   
                        <BlogPostCard
                            key={post._id} 
                            _id={post._id}
                            tag={post.tag}
                            heading={post.heading}
                            coverImageUrl={post.coverImageUrl} 
                            createdAt={post.createdAt}
                            author_id={{
                                image: post.author_id.image,  
                                username: post.author_id.username 
                            }}
                        />
                        {selectedPostId === post._id && (
                            <div className="absolute top-0 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-2">
                                <button
                                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 "
                                    onClick={() => handleEdit(post._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                    onClick={() => handleSingleBlog(post._id)}
                                >
                                    View
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
            <Modal
                isOpen={isConfirmDeleteModalOpen} 
                onClose={() => setConfirmDeleteModalOpen(false)} 
                confirmMessage="Are you sure you want to delete this blog post?" 
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

export default Blogs;
