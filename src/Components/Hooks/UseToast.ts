import { useState } from "react";

 

 const useToast = () =>{
    const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const triggerToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
  };
  return { showToast, setShowToast, toastMessage, toastType, triggerToast };
};
  export default useToast