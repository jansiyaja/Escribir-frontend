import React from 'react';
import LoginForm from '../../Components/Admin/LoginForm';





const LoginPage: React.FC = () => {
  
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 items-center justify-center">
   

   
     
        <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-lg p-8">
          
         
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
           
           
          </div>
          <div>
        <LoginForm/>
          </div>
         
        </div>
     
    </div>
  );
};

export default LoginPage;
