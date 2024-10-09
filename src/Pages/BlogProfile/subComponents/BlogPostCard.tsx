import React from 'react';
import { Avatar } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { BlogPostCardProps } from '../../../Interfaces/Components';

const 
BlogPostCard: React.FC<BlogPostCardProps> = ({ heading, tag, coverImageUrl, createdAt,author_id }) => {
  const formattedDate = new Date(createdAt).toISOString().split('T')[0];
 const {darkMode}=useSelector((state:RootState)=>state.theme)
  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <img src={coverImageUrl} alt={heading} className="w-full h-48 object-cover rounded" />
      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tag}</span>
      <h2 className={`text-xl font-bold mt-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'} overflow-hidden text-ellipsis whitespace-nowrap`}
          title={heading}>
           {heading}
           </h2>

      <div className="flex items-center mt-2">
        <Avatar size="3" src={author_id.image} fallback="A" radius="full" />
        <span className={`ml-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{author_id.username}</span>
        <span className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formattedDate}</span>
      </div>
    </div>
  );
};

export default BlogPostCard;
