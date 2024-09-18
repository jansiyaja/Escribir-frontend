import React from "react";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "../../Components/ToggleTheme";
import axiosInstance from "../../services/axiosInstance";




const HomePage: React.FC = () => {
    const navigate=useNavigate()
    const handleLogout = async () => {
        await axiosInstance.post('/users/logout', {}, { withCredentials: true });

        navigate("/login", { replace: true });
    };
    

    return (
         <>
         
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
         
           
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to the Home Page!</h2>

                <div className="mb-6">
                    <p className="text-gray-600">Hello, We're glad to have you back.</p>
                    <p className="text-gray-600">Here's a quick overview of your account:</p>
                </div>
                
                    <div>
                       

                        <div className="mt-6 flex justify-center">

                            <ToggleTheme/>
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                View Dashboard
                            </button>
                            <button 
                              onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                LogOut
                            </button>
                        </div>
                    </div>
               
            </div>
        </div>
         </>
       
    );
};

export default HomePage;
