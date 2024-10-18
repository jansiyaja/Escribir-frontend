import React, { useState } from 'react';
import { Avatar, Skeleton } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { BlogPostCardProps } from '../../../Interfaces/Components';
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import {EmailShareButton,WhatsappShareButton,LinkedinShareButton,WhatsappIcon,EmailIcon,LinkedinIcon} from 'react-share';
 
const BlogPostCard: React.FC<BlogPostCardProps> = ({ heading, tag, coverImageUrl, createdAt, author_id ,_id}) => {
  const formattedDate = new Date(createdAt).toISOString().split('T')[0];
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const shareUrl =  `${window.location.origin}/singleblog/${_id}`;
  const title = heading;

 
  const handleShareAction = () => {
    setDropdownOpen(false); 
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false); 
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleEllipsisClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAvatarClick = () => {
    if (author_id && author_id._id) {
      navigate(`/connections/${author_id._id}`);
    } else {
      console.error("author_id is undefined or missing _id");
    }
  };

  return (
    <div className={`p-4 rounded shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
   
      {isLoading ? (
        <Skeleton className="w-full h-48 rounded" />
      ) : (
        <img src={coverImageUrl} alt={heading} className="w-full h-48 object-cover rounded" />
      )}

      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {isLoading ? <Skeleton className="w-16 h-4" /> : tag}
      </span>

      <h2
        className={`text-xl font-bold mt-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'} overflow-hidden text-ellipsis whitespace-nowrap`}
        title={heading}
      >
        {isLoading ? <Skeleton className="w-3/4 h-6" /> : heading}
      </h2>

      <div className="flex items-center mt-2">
      
        {isLoading ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : (
          <Avatar size="3" src={author_id.image} fallback="A" radius="full" onClick={handleAvatarClick} />
        )}

        <span className={`ml-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {isLoading ? <Skeleton className="w-20 h-4" /> : author_id.username}
        </span>

     
        <span className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isLoading ? <Skeleton className="w-16 h-4" /> : formattedDate}
        </span>

     
        <span
          className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          onClick={handleEllipsisClick}
        >
          <HiMiniEllipsisVertical />
        </span>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setShareOpen(!shareOpen)}
              >
                Share
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  console.log('Save clicked');
                  setDropdownOpen(false);
                }}
              >
                Save
              </li>
            </ul>

            {shareOpen && (
              <div className="px-4 py-2 border-t border-gray-200 bg-white">
               
                <EmailShareButton url={shareUrl} subject={title} className="w-full flex justify-center py-2" onClick={handleShareAction}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
              
                <WhatsappShareButton url={shareUrl} title={title} className="w-full flex justify-center py-2" onClick={handleShareAction}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              
                <LinkedinShareButton url={shareUrl} title={title} className="w-full flex justify-center py-2" onClick={handleShareAction}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
