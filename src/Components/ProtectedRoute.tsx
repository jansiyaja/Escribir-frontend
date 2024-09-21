import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store'; 
import Navbar from './Navbar';

const ProtectedRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = !!user; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen">
            <Navbar /> 
            <div className="flex-1 p-5">
                <Outlet /> 
            </div>
        </div>
    );
};

export default ProtectedRoute;
