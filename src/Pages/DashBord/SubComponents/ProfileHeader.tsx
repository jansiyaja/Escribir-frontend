import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface ProfileHeaderProps {
  username?: string;
  bio?: string;
  imageUrl?: string;
   
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, bio, imageUrl }) => {
    const{darkMode}=useSelector((state:RootState)=>state.theme)

    
  return (
    <div className={`flex items-center p-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg shadow-md`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full mr-4"
        />
      )}
      <div>
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
