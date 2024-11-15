import { useEffect, useState } from "react";
import BlogPostCard from "../../BlogProfile/subComponents/BlogPostCard";
import { BlogPostCardProps } from "../../../Interfaces/Components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../../utils/errorHandling";
import Modal from "../../../Components/Modal";
import ToastComponent from "../../../Components/ToastNotification";
import { deleteSingleBlog, userBlogList } from "../../../services/Api/blogApi";
import { ROUTES } from "../../../routes/Route";

interface BlogsProps {
    authorId: string;
}

const Blogs: React.FC<BlogsProps> = ({ authorId }) => {
    const [filteredPosts, setFilteredPosts] = useState<BlogPostCardProps[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [noBlogsFound, setNoBlogsFound] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const userId = user?._id;
    const navigate = useNavigate();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const { darkMode } = useSelector((state: RootState) => state.theme);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await userBlogList(authorId);
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
        navigate(ROUTES.PROTECTED.BLOG_EDITOR);
    };

    const handleSingleBlog = (id: string) => {
        navigate(ROUTES.PROTECTED.SINGLE_BLOG.replace(":id", id));
    };

    const handleDoubleClick = (id: string) => {
        setSelectedPostId((prevId) => (prevId === id ? null : id));
    };

    const handleEdit = (id: string) => {
        navigate(ROUTES.PROTECTED.EDIT_BLOG.replace(":id", id));
    };

    const handleDeleteConfirmation = async () => {
        if (postToDelete) {
            try {
                await deleteSingleBlog(postToDelete);
                setFilteredPosts(filteredPosts.filter(post => post._id !== postToDelete));
                setToastMessage("Blog post successfully deleted!");
                setToastType("success");
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                setToastMessage(errorMessage);
                setToastType("error");
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
        <div className={`grid gap-6 w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            {noBlogsFound ? (
                <div className="flex flex-col items-center justify-center w-full text-center">
                    <p className="text-lg font-semibold">No blogs found for this user.</p>
                    <button
                        className={`mt-4 px-4 py-2 rounded-md transition ${darkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        onClick={handleCreateBlog}
                    >
                        Create Your First Blog
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
                    {filteredPosts.map((post) => (
                        <div
                            key={post._id}
                            onDoubleClick={() => handleDoubleClick(post._id)}
                            className={`relative cursor-pointer ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow-md rounded-md transition-transform transform hover:scale-105`}
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
                                    username: post.author_id.username,
                                }}
                            />
                            {selectedPostId === post._id && authorId === userId && (
                                <div className={`absolute top-0 right-0 border shadow-lg rounded-md p-2 ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                                    <button
                                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
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
                                        className="block px-4 py-2 text-sm text-green-600 hover:bg-green-100"
                                        onClick={() => handleSingleBlog(post._id)}
                                    >
                                        View
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
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
