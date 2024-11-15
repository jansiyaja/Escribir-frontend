import { useState } from "react";
import { useDispatch } from "react-redux";
import { ILogin } from "../../../Interfaces/Auth";
import { useNavigate } from "react-router-dom";
import { IErrorState } from "../../../Interfaces/Auth";
import { setCredentials } from "../../../redux/slices/authSlice";
import { userLogin } from "../../../services/Api/userApi";
import useToast from "../../UseToast"; 

const UseLogin = () => {
  const dispatch = useDispatch();
  const { triggerToast } = useToast();

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
        navigate("/");
        triggerToast("Login successful!", "success"); // Trigger success toast
      }
    } catch (error) {
      console.error("Login error:", error);
      setError({ generic: "Login failed. Please try again." });
      triggerToast("Login failed. Please try again.", "error"); // Trigger error toast
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
  };
};

export default UseLogin;
