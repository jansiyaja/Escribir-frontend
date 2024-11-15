
import React from 'react';
import BlogPostCard from '../../BlogProfile/subComponents/BlogPostCard';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface BlogPostGridProps {
  filteredPosts: BlogPostCardProps[];
  onPostClick: (id: string) => void;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ filteredPosts, onPostClick }) => {
    const { darkMode } = useSelector((state: RootState) => state.theme);
  return(
  <>
    <section className="my-8 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div onDoubleClick={() => onPostClick(post._id)} key={post._id} className={`bg-white rounded-lg shadow-md p-5 transition-transform duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
             <BlogPostCard
  _id={post._id}
  tag={post.tag}
  heading={post.heading}
  coverImageUrl={post.coverImageUrl}
  createdAt={post.createdAt}
  author_id={{
    image: post.author_id?.image || '',
    username: post.author_id?.username || 'Unknown Author',
    _id: post.author_id?._id || '',
  }}
/>

            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No blog posts available.</div>
        )}
      </div>
    </section>
    </>
  )
}

export default BlogPostGrid;
