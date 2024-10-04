import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarProps } from '../Interfaces/Components';



const AvatarComponent: React.FC<AvatarProps> = ({ src, fallback, size = 'md' }) => {
 
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <Avatar className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200`}>
      <AvatarImage src={src} alt="User Avatar" />
      <AvatarFallback className="flex items-center justify-center text-gray-500">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
