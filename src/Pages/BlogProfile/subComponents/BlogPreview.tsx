import React from 'react';
import { BlogPreviewProps } from '../../../Interfaces/Components';
import { Link } from 'react-router-dom';
import AvatarComponent from '../../../Components/AvatarComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; 
import { ROUTES } from '../../../routes/Route';

const BlogPreview: React.FC<BlogPreviewProps> = ({ heading, image, tag, content, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
      <button onClick={onClose} className="text-red-500 mb-4 pt-4">  Close </button>
        <div className="p-8">
      
          <div className="flex items-center mb-6">
            <Link to={ROUTES.PROTECTED.PROFILE} className="flex items-center mr-4">
              <AvatarComponent size="lg" src={user?.image} fallback={user?.username?.charAt(0)} />
            </Link>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{user?.username}</p>
              <p className="text-sm text-gray-500">Posted on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

         
         
          
      
          {image && (
            <div className="w-full h-48 mb-4">
              <img src={image} alt="Cover" className="w-full h-full object-cover rounded-md" />
            </div>
          )}

      
          <h1 className="text-3xl font-bold mb-2">{heading}</h1>
          <p className="text-sm text-gray-500 mb-4">Tag: <span className="font-medium text-blue-600">{tag}</span></p>
           <div className="text-lg text-gray-700 leading-relaxed">
           <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
