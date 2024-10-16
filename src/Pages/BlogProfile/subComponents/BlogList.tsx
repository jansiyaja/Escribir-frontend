import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import axiosInstance from '../../../services/Api/axiosInstance';
import FeaturedBlogPost from './FeaturedBlogPost';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { CreativeBlogLoading } from '../../../Components/Fallback';

const BlogList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostCardProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blog');
        console.log(response.data);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterPosts(value, activeTag);
  };

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    filterPosts(searchTerm, tag);
  };

  const filterPosts = (search: string, tag: string | null) => {
    let updatedPosts = blogPosts;


    if (tag) {
      updatedPosts = updatedPosts.filter(post => post.tag.toLowerCase() === tag.toLowerCase());
    }


    if (search) {
      updatedPosts = updatedPosts.filter(post => post.heading.toLowerCase().includes(search));
    }

    setFilteredPosts(updatedPosts);
  };
  const handleSingleBlog = (id: string) => {
    navigate(`/singleblog/${id}`);
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-5 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        className={`mb-5 p-3 border rounded-lg w-full max-w-lg text-lg shadow-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black'}`}
      />

      {uniqueTags.length > 0 && (
        <div className="flex justify-center mb-6 space-x-3">
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`px-4 py-2 text-sm rounded-full ${activeTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
          <button
            className={`px-4 py-2 text-sm rounded-full ${!activeTag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleTagClick(null)}
          >
            All
          </button>
        </div>
      )}

      {latestPost && (
        <div className="mb-8 w-full max-w-5xl ">
          <FeaturedBlogPost
            _id={latestPost._id}
            heading={latestPost?.heading}
            coverImageUrl={latestPost?.coverImageUrl}
            author_id={{
              image: latestPost?.author_id?.image,
              username: latestPost?.author_id?.username
            }}
            tag={latestPost?.tag}
            createdAt={latestPost?.createdAt}
          />


        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl cursor-pointer border-cyan-100  ">
        {filteredPosts.slice().map((post) => {


          return (
            <div onDoubleClick={() => handleSingleBlog(post._id)} key={post._id}>
              <BlogPostCard
                _id={post._id}
                tag={post.tag}
                heading={post.heading}
                coverImageUrl={post.coverImageUrl}
                createdAt={post.createdAt}
                author_id={{
                  image: post.author_id.image,
                  username: post.author_id.username,
                  _id:post.author_id._id
                }}
              />
            </div>
          );
        })}
      </div>

      <button className="mt-10 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition">
        View All Posts
      </button>
    </div>
  );
};

export default BlogList;
