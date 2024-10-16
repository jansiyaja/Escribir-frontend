import { useEffect, useState } from 'react';
import axiosAdminInstance from '../../../../services/Api/axioxAdminInstance';
import { useParams } from 'react-router-dom';
import { BlogPostCardProps } from '../../../../Interfaces/Components';
import SingleBlogCom from '../../../../Components/SingleBlogCom';

const SinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostCardProps | null>(null); // Ensure this can be null
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosAdminInstance.get(`/blog/singleBlog/${id}`, { withCredentials: true });
        setBlogPost(response.data.blog);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }


  if (!blogPost) {
    return <div className="text-center">Blog post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-lg shadow-lg m-5">
      <SingleBlogCom blogPost={blogPost} />
    </div>
  );
};

export default SinglePage;
