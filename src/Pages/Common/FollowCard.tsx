
import React from 'react';

interface FollowCardProps {
  username: string;
  image?: string;
  createdAt: string;
}

const FollowCard: React.FC<FollowCardProps> = ({ username, image, createdAt }) => {
  return (
    <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center">
      <img
        src={image || "default_image_url"}
        alt={`${username}'s avatar`}
        className="w-16 h-16 rounded-full mr-4"
      />

      <div className="flex-grow">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">New Follower: {username}</h2>
        </div>
        <p className="text-sm text-gray-500">
          Follower since: {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default FollowCard;
