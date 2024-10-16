import React from 'react';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { Skeleton } from '@radix-ui/themes';

const FeaturedBlogPost: React.FC<BlogPostCardProps> = ({
  heading,
  coverImageUrl,
  author_id: { image, username },  
  tag,
  createdAt, 
}) => {
  const isLoading = !heading || !coverImageUrl || !username || !image || !createdAt;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-64 bg-white">
      
      {/* Cover Image with Skeleton */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: isLoading ? undefined : `url(${coverImageUrl})`,
        }}
      >
        {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Author Image with Skeleton */}
            {isLoading ? (
              <Skeleton className="w-8 h-8 rounded-full" />
            ) : (
              <img
                src={image}
                alt={username}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            {/* Author Name with Skeleton */}
            <span className="text-sm font-medium text-white">
              {isLoading ? <Skeleton className="h-4 w-20" /> : username}
            </span>
          </div>

          {/* Tag */}
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {tag}
          </span>
        </div>

        {/* Heading with Skeleton */}
        <h1 className="text-2xl font-bold text-white leading-tight mb-2">
          {isLoading ? <Skeleton className="h-6 w-3/4" /> : heading}
        </h1>

        {/* CreatedAt with Skeleton */}
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span>
            {isLoading ? <Skeleton className="h-4 w-16" /> : new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;
