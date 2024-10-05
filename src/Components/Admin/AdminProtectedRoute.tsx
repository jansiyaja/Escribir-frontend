import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store'; 
import AdminNavBar from './AdminNavbar';


const AdminProtectedRoute: React.FC = () => {
    const { admin } = useSelector((state: RootState) => state.admin);
  
    const isAuthenticated = !admin;

   
     
    if (!isAuthenticated) {
        return <Navigate to="/adminLogin" replace />;
    }

    return (
        <div className="flex h-screen">
         <AdminNavBar/>
            <div className="flex-1 p-5 overflow-auto">
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminProtectedRoute;
