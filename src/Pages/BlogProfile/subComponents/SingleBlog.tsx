import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../services/Api/axiosInstance';
import { BlogPostCardProps, comment } from '../../../Interfaces/Components';
import Modal from '../../../Components/Modal';
import ToastComponent from '../../../Components/ToastNotification';
import { handleAxiosError } from '../../../utils/errorHandling';
import SingleBlogCom from '../../../Components/SingleBlogCom';
import { sendReactionNotification } from '../../../services/socketService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import CommentSection from './Comment';
import { addReaction, deleteReaction, getSingleBlog, reportBlog, userBlogList } from '../../../services/Api/blogApi';

const reactionTypes = [
  { emoji: '👍', label: 'Like' },
  { emoji: '😍', label: 'Love' },
  { emoji: '😄', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' }
];

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
  const [reactions, setReactions] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
   const [similarBlogs, setSimilarBlogs] = useState<BlogPostCardProps[]>([]);

  const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});

  const { user } = useSelector((state: RootState) => state.auth);

  const userId = user?._id;
  const autherId = blogPost?.author_id._id;

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await getSingleBlog(id)

        setBlogPost(response.data.blog);
        const reactionCounts: { [key: string]: number } = {};
         response.data.blog.reactions.forEach((reaction: { reactionType: string }) => {
          reactionCounts[reaction.reactionType] = (reactionCounts[reaction.reactionType] || 0) + 1;
        });

        setReactions(reactionCounts);

        const blogComments = response.data.blog.comments.map((comment: comment) => {
          return {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            createdAt: new Date(comment.createdAt).toLocaleString(),
          };
        });

        setComments(blogComments);

        const userReactionsMap: { [key: string]: boolean } = {};
        response.data.blog.reactions.forEach((reaction: { reactionType: string; userId: string }) => {
          if (reaction.userId === userId) {
            userReactionsMap[reaction.reactionType.toLowerCase()] = true;
          }
        });

        setUserReactions(userReactionsMap);
      } catch (err) {
        setError('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id, userId]);

   useEffect(() => {
    const fetchSimilarBlogs = async () => {
      try {
       const response = await userBlogList(autherId)
        const blogs = response.data.blogs.filter((blog: BlogPostCardProps) => blog._id !== autherId);
     setSimilarBlogs(blogs);
      } catch (error) {
        console.error('Failed to fetch simil ar blogs:', error);
      }
    };

    if (autherId) {
      fetchSimilarBlogs();
    }
  }, [autherId]);

 
   


  const handleReport = () => {
    setConfirmReportModalOpen(true);
  };

  const handleReportConfirmation = async () => {
    if (reportReason.trim()) {
      try {
        const response = await  reportBlog(id,reportReason)
        if (response.status === 200) {
          setToastMessage('Blog post successfully reported!');
          setToastType('success');
          setToastOpen(true);
          setReportReason('');
          setConfirmReportModalOpen(false);
        }
      } catch (error) {
        let errorMessage = handleAxiosError(error);
        setToastMessage(errorMessage);
        setToastType('error');
        setToastOpen(true);
      }
    } else {
      setToastMessage('Please provide a valid reason.');
      setToastType('error');
      setToastOpen(true);
    }
  };

  const handleReaction = async (reaction: string) => {
    const lowerReaction = reaction.toLowerCase();
    const alreadyReacted = userReactions[lowerReaction];
    const reactionExists = reactions[lowerReaction] > 0;

    try {
      if (alreadyReacted || (reactionExists && reactions[lowerReaction] === 1)) {
     await deleteReaction(id, reaction, autherId);
        setReactions((prevReactions) => ({
          ...prevReactions,
          [lowerReaction]: prevReactions[lowerReaction] - 1,
        }));
        setUserReactions((prev) => ({ ...prev, [lowerReaction]: false }));
      } else {
        if (!userId) return null;
        if (!autherId) return null;

        await addReaction(id,reaction,autherId)
        setReactions((prevReactions) => ({
          ...prevReactions,
          [lowerReaction]: (prevReactions[lowerReaction] || 0) + 1,
        }));
        setUserReactions((prev) => ({ ...prev, [lowerReaction]: true }));
        sendReactionNotification(userId, autherId, reaction);
      }
    } catch (error) {
      setToastMessage('Failed to register your reaction.');
      setToastType('error');
      setToastOpen(true);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await axiosInstance.post(`/blog/comment/${id}`, { comment: newComment, autherId });

        const newCommentObject: comment = {
          content: newComment,
          userId: userId!,
          createdAt: new Date().toLocaleString()
        };

        setComments((prevComments) => [...prevComments, newCommentObject]);
        setNewComment('');
      } catch (error) {
        setToastMessage('Failed to post your comment.');
        setToastType('error');
        setToastOpen(true);
      }
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
    <div className="max-w-5xl mx-auto ">
      <SingleBlogCom blogPost={blogPost} />

      <div className="flex justify-between mt-4">
      <div className="flex space-x-4">
            {reactionTypes.map((reaction) => (
              <div key={reaction.label} className="text-center">
                <button
                  className="w-12 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-2xl transition-transform duration-200 transform hover:scale-110 active:scale-90"
                  onClick={() => handleReaction(reaction.label)}
                  title={reaction.label}
                >
                  {reaction.emoji}
                </button>
                <div className="text-sm mt-1">{reactions[reaction.label.toLowerCase()] || 0}</div>
              </div>
            ))}
          </div>

        <div className="flex space-x-4">
          

          <button
            className="bg-red-600 text-white py-2 px-4 rounded h-10 hover:bg-red-700 transition duration-200"
            onClick={handleReport}
          >
            Report
          </button>
        </div>
      </div>
     

      <CommentSection
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
      />

        <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">More from this author</h2>
      <div className="overflow-x-scroll flex space-x-4">
        {similarBlogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden">
            <img src={blog.coverImageUrl} alt={blog.heading} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{blog.heading}</h3>
              
            </div>
          </Link>
        ))}
      </div>
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
            className="border border-gray-300 rounded w-full h-20 p-2"
            placeholder="Enter your reason..."
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
