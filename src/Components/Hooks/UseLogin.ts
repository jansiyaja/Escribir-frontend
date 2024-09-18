import React from 'react'
import { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { ILogin } from '../../Interfaces/Auth';
import { useNavigate } from 'react-router-dom';
import { IErrorState } from '../../Interfaces/Auth';


const UseLogin = () => {

    const [login, setLogin] = useState<ILogin>({
     
        email: "",
        password: "",
       
      });
      const [error, setError] = useState<Partial<IErrorState>>({});
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
    
  
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
       
        
        setLogin({
          ...login,
          [e.target.name]: e.target.value,
        });
        setError({
          ...error,
          [e.target.name]: "",
        });
      };
    
   
  const validateInputs = () => {
    let tempErrors: Partial<IErrorState> = {};

    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!login.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(login.email)) {
      tempErrors.email = "Email is invalid";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!login.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(login.password)) {
      tempErrors.password =
        "Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character";
    }

   

    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
  
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
   
      try {
        

        const response = await axiosInstance.post("/users/login", login, { withCredentials: true });
        console.log(response);
        
  
        if (response.status=== 200) {
          console.log('Navigating to home page');
           navigate("/");
        }
      } catch (error) {
        console.error('Login error:', error);
        setError({ generic: "Registration failed. Please try again." });
      } finally {
        setLoading(false);
      }
    };
  return {
    login,
loading,
error,
handleLogin,
handleChange,
  }
}

export default UseLogin
