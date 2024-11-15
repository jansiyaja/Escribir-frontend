import React from 'react';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { Skeleton } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

const FeaturedBlogPost: React.FC<BlogPostCardProps> = ({
  heading,
  coverImageUrl,
  author_id: { image, username },
  tag,
  createdAt,
}) => {
  const isLoading = !heading || !coverImageUrl || !username || !image || !createdAt;
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} rounded-2xl p-6 shadow-lg`}>
      <div className="grid md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border shadow-lg">
        
      
        <div className="md:col-span-5 space-y-4 order-2 md:order-1">
          

          <div className="flex items-center space-x-2">
            <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              {tag}
            </span>
          </div>

   
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            {isLoading ? <Skeleton className="h-16 w-full" /> : heading}
          </h1>

 
          <div className="flex items-center space-x-4">
            <div className="relative">
              {isLoading ? (
                <Skeleton className="w-10 h-10 rounded-full" />
              ) : (
                <img
                  src={image}
                  alt={username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white ring-2 ring-purple-100"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {isLoading ? <Skeleton className="h-4 w-24" /> : username}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  new Date(createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })
                )}
              </span>
            </div>
          </div>
        </div>

     
        <div className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
            {isLoading ? (
              <Skeleton className="absolute inset-0 w-full h-full" />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${coverImageUrl})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
            
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;
