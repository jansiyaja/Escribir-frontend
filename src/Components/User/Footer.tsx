import React from "react";
import { Link } from "react-router-dom";

import lightLogo from "../../assets/Images/Logo.svg"
import darkLogo from "../../assets/Images/LogoB.svg"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Footer: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <footer className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-4`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex-shrink-0">
            <img src={darkMode ? darkLogo : lightLogo} alt="Logo" className="h-10" />
          
          </Link>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold font-bodoni">Escriber</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your trusted blog author
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Escriber. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
