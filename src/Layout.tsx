import React from 'react';

import Footer from './Components/User/Footer';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';



const Layout: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex-1 overflow-auto">
                <Outlet /> 
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
