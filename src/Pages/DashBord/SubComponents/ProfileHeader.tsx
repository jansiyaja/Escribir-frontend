import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface ProfileHeaderProps {
  username?: string;
  bio?: string;
  imageUrl?: string;
   
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, bio,  }) => {
    const{darkMode}=useSelector((state:RootState)=>state.theme)

    
  return (
    <div
      className={`flex flex-col md:flex-row items-center p-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg shadow-md`}
    >
      <div>
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
