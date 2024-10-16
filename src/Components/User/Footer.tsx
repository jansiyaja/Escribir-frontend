import React from 'react';
import { Avatar } from '@radix-ui/themes';
import logo from '../../assets/Images/logoo.png'


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        
     
        <div className="flex items-center space-x-4">
          <Avatar
            size="9"
            src={logo}
            fallback="E"
            radius="full"
            style={{ objectFit: 'cover' }}
          />
          <div>
            <h2 className="text-lg font-semibold font-bodoni">Escriber</h2>
            <p className="text-sm text-gray-400">Your trusted blog author</p>
          </div>
        </div>

   
        <div className="text-sm">
          © {new Date().getFullYear() === 2024 ? "2024" : new Date().getFullYear()} Escriber. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
