import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store'; 

import Header from '../Header';
import Footer from './Footer';



const ProtectedRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = !!user; 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        
        <div className="min-h-screen ">
          
            <Header /> 
            <div className="flex-1 overflow-auto">
               
                <Outlet /> 
                
            </div>
            <Footer/>
            
        </div>
        
    );
};

export default ProtectedRoute;
