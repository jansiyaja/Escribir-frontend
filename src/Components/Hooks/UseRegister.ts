
import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IRegister,IErrorState } from "../../Interfaces/Auth";
import axios from "axios";



const useRegister = () => {
  const [register, setRegister] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<IErrorState>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
   
    const value = e.target.name === 'email' ? e.target.value.toLowerCase() : e.target.value;
    setRegister({
      ...register,
      [e.target.name]: value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateInputs = () => {
    let tempErrors: Partial<IErrorState> = {};
     const usernameRegex = /^[A-Za-z]+( [A-Za-z]+){0,3}$/;

    if (!register.username) {
      tempErrors.username = "Username is required";
    } else if (!usernameRegex.test(register.username)) {
      tempErrors.username = "Username must contain only letters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!register.email) {
     
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(register.email)) {
      tempErrors.email = "Email is invalid";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!register.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(register.password)) {
      tempErrors.password =
        "Password must be at least 6 characters, contain at least one uppercase letter, one number, and one special character";
    }

    if (!register.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
    } else if (register.password !== register.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);

    try {
        const response = await axiosInstance.post("/users/register", register);
        console.log(response);

        if (response.status === 201) {
            localStorage.setItem("emailForVerification", register.email);
            navigate("/OTP-Verification");
        }
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = "Registration failed. Please try again.";

      if (axios.isAxiosError(error)) {
          if (error.response) {
              const backendErrors = error.response.data.error;
              errorMessage = backendErrors || "An unexpected error occurred.";
          } else if (error.request) {
              errorMessage = "Network error. Please check your connection and try again.";
          }
      }

      setErrors({ generic: errorMessage });
  } finally {
        setLoading(false);
    }
};

  return {
    register,
    errors,
    loading,
    handleChange,
    handleRegister,
  };
};

export default useRegister;
