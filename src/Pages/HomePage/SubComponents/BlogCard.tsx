import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../services/Api/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { CreativeBlogLoading } from '../../../Components/Fallback';

import TagFilter from './Tagfilter';
import LatestPost from './LatestPost';
import BlogPostGrid from './BlogPostGrid';
import { useSearch } from '../../../Contexts/SearchContext';
import { ROUTES } from '../../../routes/Route';


const BlogCard: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostCardProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { searchTerm } = useSearch();  
  
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blog');
        setBlogPosts(response.data);
        setFilteredPosts(response.data);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
  };


  useEffect(() => {
    let updatedPosts = blogPosts;

    if (activeTag) {
      updatedPosts = updatedPosts.filter(post => post.tag.toLowerCase() === activeTag.toLowerCase());
    }

    if (searchTerm) {
      updatedPosts = updatedPosts.filter(post => post.heading.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredPosts(updatedPosts);
  }, [searchTerm, activeTag, blogPosts]);

  const handleSingleBlog = (id: string) => {
   navigate(ROUTES.PROTECTED.SINGLE_BLOG.replace(":id", id));
  };

  const uniqueTags = Array.from(new Set(blogPosts.map(post => post.tag)));

  if (loading) {
    return (
      <div className="space-y-8">
        <CreativeBlogLoading>
          Preparing Your Writing Canvas
        </CreativeBlogLoading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  const latestPost = blogPosts.length > 0 ? blogPosts[0] : null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center  tec p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      
        <TagFilter uniqueTags={uniqueTags} activeTag={activeTag} onTagClick={handleTagClick} />



      <LatestPost latestPost={latestPost} />

    
      <BlogPostGrid filteredPosts={filteredPosts} onPostClick={handleSingleBlog} />


     
    </div>
  );
};

export default BlogCard;
