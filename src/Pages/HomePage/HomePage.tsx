import React from "react";

import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store"; 

import BlogList from "../BlogProfile/subComponents/BlogList";

const HomePage: React.FC = () => {
  


    const {darkMode}  =  useSelector(( state:RootState)=>state.theme);

    return (
        
            <div className={`min-h-screen flex items-center justify-around ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
               
                <main className="p-5">
           <BlogList /> 
        
          </main>
            </div>
    
    );
};

export default HomePage;
