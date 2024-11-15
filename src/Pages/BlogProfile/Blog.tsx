import React from 'react';
import CreateBlog from './subComponents/CreateBlog';

import SingleBlog from './subComponents/SingleBlog';

interface CommonBlogProps {
  page: string;
}

const Blog: React.FC<CommonBlogProps> = ({ page }) => {
  const renderComponent = () => {
    switch (page) {
      case 'blogeditor':
        return <CreateBlog />;
    
      case 'singleblog':
        return <SingleBlog />; 
    
      default:
        return <div>Page not found</div>;
    }
  };

  return (
     <div className="`min-h-screen w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
 {renderComponent()}
                </div>
   
  );
};

export default Blog;
