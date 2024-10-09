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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center">
      {renderComponent()}
    </div>
  );
};

export default Blog;
