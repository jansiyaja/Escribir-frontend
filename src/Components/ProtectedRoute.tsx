
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';


const ProtectedRoute: React.FC = () => {
    console.log("verifyong");
    
    const { isAuthenticated } = useAuth();

    console.log("Authenticated:", isAuthenticated);
    if (!isAuthenticated) {

        console.log("Redirecting to login");
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen">
            <div className="w-16 bg-gray-100">
                <Navbar />
            </div>
            <div className="flex-1 bg-white">
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedRoute;
