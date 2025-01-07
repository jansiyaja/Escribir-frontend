import React from 'react';
import women from '../../assets/Images/women.png';
import Login from '../../Components/Auth/Login';
import Register from '../../Components/Auth/Register';
import OTP from '../../Components/Auth/OTP';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

interface CommonPageProps {
  page: string;
}

const CommonPage: React.FC<CommonPageProps> = ({ page }) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const renderComponent = () => {
    switch (page) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'otp':
        return <OTP />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 to-white text-gray-900'
      }`}
    >

      <div className="lg:w-1/2 w-full relative flex items-center justify-center">
        <img
          className={`h-auto w-full lg:h-full object-contain lg:object-cover lg:w-full ${
            darkMode ? 'opacity-80' : ''
          }`}
          src={women}
          alt="vector"
        />
      </div>

    
      <div
        className={`lg:w-1/2 w-full flex items-center ${
          darkMode ? 'bg-gray-900' : 'bg-gray-200'
        }`}
      >
        <div
          className={`w-full max-w-md ${
            darkMode
              ? 'bg-gray-800 border-gray-700 shadow-gray-900'
              : 'bg-white border-gray-300 shadow-lg'
          } border rounded-2xl shadow-lg p-6 sm:p-8 mx-auto lg:mx-0`}
        >
          <div className="flex items-center justify-between mb-6">
            <h1
              className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-bold ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              {page === 'login'
                ? 'Login'
                : page === 'register'
                ? 'Create an account'
                : 'Verify OTP'}
            </h1>
          </div>

          <div>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
