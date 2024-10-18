import React from 'react';

import women from '../../assets/Images/women.png';
import Login from '../../Components/Auth/Login';
import Register from '../../Components/Auth/Register';
import OTP from '../../Components/Auth/OTP';

interface CommonPageProps {
  page: string;
}

const CommonPage: React.FC<CommonPageProps> = ({ page }) => {
  console.log(page);

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
    <div className="flex flex-col lg:flex-row min-h-screen">
 
      <div className="lg:w-1/2 w-full relative flex items-center justify-center">
        <img
          className="h-auto w-full lg:h-full object-contain lg:object-cover lg:w-full"
          src={women}
          alt="vector"
        />
      </div>


      <div className="lg:w-1/2 w-full flex items-center bg-white">
        <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-lg p-6 sm:p-8 mx-auto lg:mx-0">

          <div className="flex items-center justify-between mb-6">
         <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
  {page === 'login' ? 'Login' : page === 'register' ? 'Create an account' : 'Verify OTP'}
</h1>


          </div>

          <div>
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
