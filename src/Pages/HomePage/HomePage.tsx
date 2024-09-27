import React from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../services/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store/store"; 
import { logout } from "../../redux/slices/authSlice";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const {darkMode}  =  useSelector(( state:RootState)=>state.theme);
    const handleLogout = async () => {
        await axiosInstance.post('/users/logout', {}, { withCredentials: true });
        
    
        dispatch(logout());
        
        navigate("/login", { replace: true });
    };

    return (
        <>
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to the Home Page!</h2>
                    <div className="mb-6 ">
                        <p className="text-gray-600">Hello, {user?.username || "Guest"}! We're glad to have you back.</p>
                        <p className="text-gray-600">Here's a quick overview of your account:</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                        
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
        </>
    );
};

export default HomePage;
