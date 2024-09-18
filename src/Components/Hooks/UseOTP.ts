
import {  useState ,} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import axios from 'axios'

const UseOTP = () => {
 const [otp, setOtp] = useState(Array(4).fill(""));
  
const [error, setError] = useState("");
const [loading, setLoading] = useState<boolean>(false);
const [timer,setTimer]=useState<number>(0);
const [rendering,setRendering]=useState<boolean>(false)
const navigate = useNavigate();

const email = localStorage.getItem("emailForVerification");
let countdown: NodeJS.Timeout | null = null; // Local variable for interval
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
  console.log( "am clicked");
  
  if (timer > 0) return; 

  setRendering(true);
  startTimer()

  try {
    
    const response= await axiosInstance.post('/users/resend-otp',{email:email?.toLocaleLowerCase()})
    console.log(email);
    
     console.log(response)

  } catch (error) {
    if (countdown) {
      clearInterval(countdown);
    }

     let errorMessage="Failed to resend OTP. Please try again later."
    if (axios.isAxiosError(error)) {
      if (error.response) {
          const backendErrors = error.response.data.error;
          errorMessage = backendErrors || "An unexpected error occurred.";
      } else if (error.request) {
          errorMessage = "Network error. Please check your connection and try again.";
      }
  }
    setError(errorMessage)
  }
  finally{
    setRendering(false)
  }
}


      const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        
        
        if (!email) {
          setError("No email found. Please register again.");
          setLoading(false);
          return;
        }
        
        try {
          
          const response = await axiosInstance.post("/users/verify-otp", { otp:otp.join(""), email: email.toLowerCase() });
          console.log(response);

           if (response.status === 200) {
            localStorage.removeItem("emailForVerification");
            navigate('/login'); 
          }
        }catch (error) {
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

      setError(errorMessage);
  } finally {
          setLoading(false);
        }
      }
    
  return {
error,
loading,
otp,
setOtp,
handleVerifyOtp,
resendOtp,
rendering,
timer

  }
  
  
}

export default UseOTP
