import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextType } from "../Interfaces/contexts";
import Cookies from "js-cookie";
 const  AuthContext = createContext<AuthContextType | undefined>(undefined);
  export const AuthProvider:React.FC<{children:ReactNode}>=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false);

    useEffect(()=>{

        Cookies.set('testCookie', 'testValue');

        const testCookie = Cookies.get('testCookie');
        console.log('Test Cookie:', testCookie); // Should log 'testValue'


        const token=Cookies.get("accessToken");
        console.log("Token from cookie:", token);
        setIsAuthenticated(!token);
    },[])

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        Cookies.remove('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
  }
  export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
       
        
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};