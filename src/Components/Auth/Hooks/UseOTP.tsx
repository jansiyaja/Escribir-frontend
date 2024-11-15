import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/Api/axiosInstance";
import axios from 'axios';
import { verifyOtp } from "../../../services/Api/userApi";
import useToast from "../../UseToast";

const UseOTP = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [rendering, setRendering] = useState<boolean>(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("emailForVerification");
  let countdown: NodeJS.Timeout | null = null;
  const { triggerToast } = useToast(); 

  const startTimer = () => {
    setTimer(30);
    if (countdown) {
      clearInterval(countdown);
    }
    countdown = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          clearInterval(countdown as NodeJS.Timeout);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const resendOtp = async (): Promise<void> => {
    if (timer > 0) return;

    setRendering(true);
    startTimer();

    try {
      const response = await axiosInstance.post('/users/resend-otp', { email: email?.toLocaleLowerCase() });

      if (response.status = 200) {
        triggerToast("OTP has been resent to your email.", "success");
      }

    } catch (error) {
      if (countdown) {
        clearInterval(countdown);
      }

      let errorMessage = "Failed to resend OTP. Please try again later.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const backendErrors = error.response.data.error;
          errorMessage = backendErrors || "An unexpected error occurred.";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      }

   
      triggerToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
      setRendering(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setError("No email found. Please register again.");
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtp({ otp: otp.join(""), email: email.toLowerCase() });

      if (response.status === 200) {
        // Trigger success toast for successful OTP verification
        triggerToast("OTP verification successful!", "success");
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = "Invalid OTP. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const backendErrors = error.response.data.error;
          errorMessage = backendErrors || "An unexpected error occurred.";
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
      }

      // Trigger error toast for OTP verification failure
      triggerToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    otp,
    setOtp,
    handleVerifyOtp,
    resendOtp,
    rendering,
    timer,
  };
};

export default UseOTP;
