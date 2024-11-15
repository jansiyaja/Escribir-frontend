
import React from 'react';

interface FollowCardProps {
  username: string;
  image?: string;
  message?: string;
 
}

const FollowCard: React.FC<FollowCardProps> = ({ username, image,message,  }) => {
  return (
    <div className='flex' >
      <img
        src={image || "default_image_url"}
        alt={`${username}'s avatar`}
        className="w-8 h-8 rounded-full mr-4"
      />
        <p> <span>{message}</span> </p>
    </div>
  );
};

export default FollowCard;
