import { useState } from "react";
import { useDispatch } from "react-redux";
import { ILogin } from "../../../Interfaces/Auth";
import { useNavigate } from "react-router-dom";
import { IErrorState } from "../../../Interfaces/Auth";
import { setCredentials } from "../../../redux/slices/authSlice";
import { userLogin } from "../../../services/Api/userApi";
import useToast from "../../UseToast"; 
import { ROUTES } from "../../../routes/Route";
import { handleAxiosError } from "../../../utils/errorHandling";

const UseLogin = () => {
  const dispatch = useDispatch();
   const { showToast, setShowToast, toastMessage, toastType ,triggerToast} = useToast();

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
      tempErrors.password = "Invalid password";
    }

    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const response = await userLogin(login);

      if (response.status === 200) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        navigate(ROUTES.PUBLIC.HOME);
   
        triggerToast("Login successful!", "success"); 
         setShowToast(true);
      }
    } catch (error) {
      
      const errorMessage = handleAxiosError(error);
       setShowToast(true);
      console.log(errorMessage);
      triggerToast(errorMessage, "error"); 
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
    showToast,
    toastMessage,
    toastType,
    setShowToast
    
  };
};

export default UseLogin;
