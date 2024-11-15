
import React from 'react';
import FeaturedBlogPost from '../../BlogProfile/subComponents/FeaturedBlogPost';
import { BlogPostCardProps } from '../../../Interfaces/Components';

interface LatestPostProps {
  latestPost: BlogPostCardProps | null;
}

const LatestPost: React.FC<LatestPostProps> = ({ latestPost }) => {
  if (!latestPost) return null;

  return (
    <div className="mb-8 w-full ">
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
  );
};

export default LatestPost;
