import React from 'react';
import { BlogPostCardProps } from '../../../Interfaces/Components';

const FeaturedBlogPost: React.FC<BlogPostCardProps> = ({
  heading,
  coverImageUrl,
  author_id: { image, username },  
  tag,
  createdAt, 
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md w-full h-64 bg-white">
    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-4">
     
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={image}
              alt={username}  
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">{username}</span>
          </div>
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {tag}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-white leading-tight mb-2">
          {heading}
        </h1>

     
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;