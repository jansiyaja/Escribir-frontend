
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ILogin } from '../../Interfaces/Auth';
import { useNavigate } from 'react-router-dom';
import { IErrorState } from '../../Interfaces/Auth';
import { setCredentials } from '../../redux/slices/adminSlice';
import Spinner from '../Spinner';
import PasswordToogle from '../PasswordToggle';
import axiosAdminInstance from '../../services/Api/axioxAdminInstance';
import { ROUTES } from '../../routes/Route';


const LoginForm = () => {
  const dispatch = useDispatch();


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
        
       console.log(login);
       
        const response = await axiosAdminInstance.post("/admin/login", login, { withCredentials: true });
       
        
  
        if (response.status=== 200) {
         
          dispatch(setCredentials({
            admin: response.data.admin, 
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        }));
        
        
           navigate(ROUTES.ADMIN.DASHBOARD);
        }
      } catch (error) {
        console.error('Login error:', error);
        setError({ generic: "Login failed. Please try again." });
      } finally {
        setLoading(false);
      }
    };
  return (
    <form onSubmit={handleLogin}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={login.email}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
      {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
    </div>

   

    <PasswordToogle
      id="password"
      name="password"
      value={login.password}
      placeholder="Enter your password"
      onChange={handleChange}
      error={error.password}
      label="Password"
    />

    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      disabled={loading}
    >
     
      <Spinner size="h-5 w-5" color="text-white" text="Verifying..." isLoading={loading} />
     
      {!loading && "Login"}
    </button>
    {error.generic && <p className="text-red-500 text-sm mt-1 text-center">{error.generic}</p>}
  </form>
  )
}

export default LoginForm








 


 

