import React, { useEffect } from "react";

import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store"; 

import BlogList from "../BlogProfile/subComponents/BlogList";
import { loginUser } from "../../services/Api/socketService";

   const HomePage: React.FC = () => {
   const { user } = useSelector((state: RootState) => state.auth);


    const { darkMode } = useSelector((state: RootState) => state.theme);
       useEffect(() => {
           const userId = user?._id
           if (!userId) {
               return
           }
       loginUser(userId) 
    })

    return (
        
            <div className={`min-h-screen flex items-center justify-around ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
               
                <main className="p-5">
           <BlogList /> 
        
          </main>
            </div>
    
    );
};

export default HomePage;
